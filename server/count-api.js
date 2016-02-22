import Redis from 'redis';

const COUNT_KEY = 'count';
const COUNT_PATH = '/api/count';
const COUNT_CHANNEL = `${COUNT_KEY}-values`

export default function(app) {

  // `REDIS_URL` is a Heroku-style database URL.
  // If nil, will connect to default localhost:6379
  const redis = createRedisClient();
  const redisListen = createRedisClient();
  // Global subscription for server sent events
  redisListen.subscribe(COUNT_CHANNEL);
  redisListen.on("error", function(err) {
    console.error(`Redis Error: ${err}`);
  });

  app.get(COUNT_PATH, function(req, res, next) {
    redis.get(COUNT_KEY, function(err, reply) {
      if (err != null) { next(err); }
      const value = reply || 0;

      if (req.headers.accept === 'text/event-stream') {
        // Start Server Sent Events response
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        });
        res.write('\n');

        // Send an SSE message for each value change
        let messageId = 0;
        redisListen.on("message", function(channel, message) {
          if (channel === COUNT_CHANNEL) {
            messageId++;
            res.write(`id: ${messageId}\n`);
            res.write(`data: ${message}\n\n`);
          }
        });
      } else {
        // Send a normal JSON response
        res.json({ value: value });
      }
    });
  });

  app.post(`${COUNT_PATH}/increment`, function(req, res, next) {
    const redisTransactionLua = `
      local value = redis.call('incr','${COUNT_KEY}')
      redis.call('publish', '${COUNT_CHANNEL}', value)
      return value
    `;
    redis.eval(redisTransactionLua, 0, function(err, reply) {
      if (err != null) { next(err); }
      if (wantsJson(req.headers['accept'])) {
        res.json({ value: reply });
      } else {
        res.redirect('/');
      }
    });
  });

  app.post(`${COUNT_PATH}/decrement`, function(req, res, next) {
    const redisTransactionLua = `
      local value = redis.call('decr','${COUNT_KEY}')
      redis.call('publish', '${COUNT_CHANNEL}', value)
      return value
    `;
    redis.eval(redisTransactionLua, 0, function(err, reply) {
      if (err != null) { next(err); }
      if (wantsJson(req.headers['accept'])) {
        res.json({ value: reply });
      } else {
        res.redirect('/');
      }
    });
  });

  return app;
}

function createRedisClient() {
  return Redis.createClient(process.env.REDIS_URL);
}

function wantsJson(acceptHeader) {
  return acceptHeader != null && acceptHeader.indexOf('application/json') >= 0;
}

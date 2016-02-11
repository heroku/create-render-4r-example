import Redis from 'redis';

// `REDIS_URL` is a Heroku-style database URL.
// If nil, will connect to default localhost:6379
const redis = Redis.createClient(process.env.REDIS_URL);

const COUNT_KEY = 'count';
const COUNT_PATH = '/api/count';

export default function(app) {

  app.get(COUNT_PATH, function(req, res, next) {
    redis.get(COUNT_KEY, function(err, reply) {
      if (err != null) { next(err); }
      res.json({ value: reply || 0 });
    });
  });

  app.post(`${COUNT_PATH}/increment`, function(req, res, next) {
    redis.incr(COUNT_KEY, function(err, reply) {
      if (err != null) { next(err); }
      res.json({ value: reply });
    });
  });

  app.post(`${COUNT_PATH}/decrement`, function(req, res, next) {
    redis.decr(COUNT_KEY, function(err, reply) {
      if (err != null) { next(err); }
      res.json({ value: reply });
    });
  });

  return app;
}
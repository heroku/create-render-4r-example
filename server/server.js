/* eslint-disable no-console, no-use-before-define */

import createRender4r from 'create-render-4r'

import path from 'path'
import Express from 'express'
import qs from 'qs'

// These are only used in `NODE_ENV=development`
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import configureStore from '../common/store/configure-store'
import routes from '../common/routes'

const app = new Express()
const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || 'development';

if (nodeEnv === 'development') {
  // Use this middleware to set up hot module reloading via webpack.
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
} else {
  // Serve pre-built bundle
  app.use(Express.static('public'));
}

// Add demo "count" API to the Express app
// (For a real app, run API's as a separate server.)
import addCountApi from './count-api';
addCountApi(app);

// Create the renderer.
var render4r = createRender4r({
  routes:       routes,
  createStore:  configureStore,
  layoutHtml:   renderFullPage
});

// This is fired every time the server side receives a request
app.use(render4r)

function renderFullPage(componentHTML, cleanInitialState, documentMeta) {
  return `
    <!doctype html>
    <html>
      <head>
        ${documentMeta}
      </head>
      <body>
        <div id="react-app">${componentHTML}</div>
        <script>
          window.__INITIAL_STATE__ = ${cleanInitialState};
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})

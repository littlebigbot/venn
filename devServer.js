import webpack from 'webpack'
import express from 'express'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from './webpack.config.babel'

const compiler = webpack(config)
const app = express()

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' }
});

app.use(webpackHotMiddleware(compiler, {
	log: console.log,
	path: '/__webpack_hmr',
	heartbeat: 10 * 1000
}))
app.use(devMiddleware);

app.get('*', (req, res) => {
  // Here is it! Get the index.html from the fileSystem
  const htmlBuffer = devMiddleware.fileSystem.readFileSync(`${config.output.path}/index.html`)

  res.send(htmlBuffer.toString())
})

app.listen(9000, 'localhost')
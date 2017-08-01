'use strict';

import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.dev';

const port = 4040;
const app = express();

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	stats: {colors: true}
}));

app.use(webpackHotMiddleware(compiler, {
	log:console.log,
	path: '/__webpack_hmr'
}));

app.route('/')
	.get(function (req, res) {
		res.sendFile(path.join(__dirname + '/src/index.html'))
	})

app.listen(4040);

console.log(`listening on port ${port}`);

export default app;
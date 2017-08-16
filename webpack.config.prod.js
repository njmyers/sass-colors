import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
	devtool: 'inline-source-map',
	entry: [
		path.resolve(__dirname, 'src/index.js'),
	    'webpack-hot-middleware/client?path=/__webpack_hmr'
	],
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'src'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
			{test: /\.md$/, loaders: ['html-loader', 'markdown-loader']},
			{test: /\.hbs$/, loaders: ['handlebars-loader']},
			{test: /\.(gif|png|jpe?g|svg)$/i, loaders: ['file-loader']},
			{test: /\.sass$/, use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})}
		]
	},
	plugins: [
	    new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoEmitOnErrorsPlugin(),
	    new ExtractTextPlugin('style.css')
    ]
}
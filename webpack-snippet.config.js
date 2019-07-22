require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

const PRODUCTION = 'production'

const MODE = process.env.NODE_ENV || PRODUCTION

const COMMON_DIR = path.resolve(__dirname, 'common')

const isProduction = MODE === PRODUCTION

module.exports = {
	entry: './snippet/index.js',
	output: {
		path: path.resolve(__dirname, './snippet/output'),
		filename: 'snippet.js'
	},
	resolve: {
		extensions: ['.js'],
		modules: ['node_modules', COMMON_DIR],
	},
	mode: MODE,
	plugins: [
		new webpack.DefinePlugin({
			ELEMENT_WIDGET_URL: isProduction
				? JSON.stringify(process.env.ELEMENT_WIDGET_URL)
				: JSON.stringify(`http://localhost:${process.env.WEBPACK_DEV_SERVER_PORT}/element-widget.html`),
		})
	]
};
require('dotenv').config()
const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const PRODUCTION = 'production'

const MODE = process.env.NODE_ENV || PRODUCTION

const IS_PRODUCTION = MODE === PRODUCTION

const ELEMENT_WIDGET_DIR = path.resolve(__dirname, 'client/element-widget')

const CLIENT_DIR = path.resolve(__dirname, 'client')

const COMMON_DIR = path.resolve(__dirname, 'common')

const BUILT_DIR = path.resolve(__dirname, 'client/dist')

module.exports = {
	entry: './client/element-widget/element-widget.tsx',
	mode: MODE,
	devtool: "source-map",
	output: {
		path: path.join(__dirname, '/client/dist'),
		filename: 'element-widget.[hash].min.js'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
		modules: ['node_modules', CLIENT_DIR, COMMON_DIR],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /mode_modules/,
				loader: 'ts-loader'
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.module\.s(a|c)ss$/,
				loader: [
					!IS_PRODUCTION ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localsConvention: 'camelCase',
							sourceMap: !IS_PRODUCTION
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: !IS_PRODUCTION
						}
					}
				]
			},
			{
				test: /\.s(a|c)ss$/,
				exclude: /\.module.(s(a|c)ss)$/,
				loader: [
					!IS_PRODUCTION ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: !IS_PRODUCTION
						}
					}
				]
			},
			{
				test: /\.(gif|png|jpg|svg|eot|woff|woff2|ttf)$/,
				loader: 'file-loader',
			}
		]
	},
	devServer: {
		contentBase: BUILT_DIR,
		compress: true,
		port: process.env.WEBPACK_DEV_SERVER_PORT || 9000,
		proxy: {
			'/api': 'http://localhost:' + process.env.SAMBA_LIVE_PORT,
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(ELEMENT_WIDGET_DIR, 'element-widget.html'),
			filename: 'element-widget.html',
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			}
		}),
		new MiniCssExtractPlugin({
			filename: IS_PRODUCTION ? '[name].[hash].css' : '[name].css',
			chunkFilename: IS_PRODUCTION ? '[id].[hash].css' : '[id].css',
		}),
		new webpack.optimize.OccurrenceOrderPlugin(false),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	]
}
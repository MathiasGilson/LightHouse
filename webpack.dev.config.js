var path = require("path")
var webpack = require("webpack")

const SOURCE_DIR = path.resolve(__dirname, "src")
const PUBLIC_DIR = path.resolve(__dirname, "public")

const CSS_MODULES_HASH = "[local]__[hash:base64:7]"

module.exports = {
	context: SOURCE_DIR,
	entry: {
		app: SOURCE_DIR
	},
	output: {
		path: PUBLIC_DIR,
		publicPath: "/",
		filename: "js/[name].bundle.js"
	},
	devtool: "eval", //'cheap-module-eval-source-map',
	module: {
		rules: [
			{
				// compile CSS modules
				test: /\.scss$/,
				include: SOURCE_DIR,
				use: [
					{
						loader: "style-loader",
						options: {
							sourceMap: true
						}
					},
					{
						// translates CSS into CommonJS
						loader: "css-loader",
						options: {
							autoprefixer: false,
							sourceMap: true,
							importLoaders: 1,
							modules: true,
							localIdentName: CSS_MODULES_HASH
						}
					},
					{
						// prefix CSS
						loader: "postcss-loader"
					},
					{
						// compiles Sass to CSS
						loader: "sass-loader"
					}
				]
			},
			{
				test: /.js?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							cacheDirectory: false,
							presets: ["es2015", "react", "stage-2"],
							plugins: [
								[
									"module-alias",
									[
										{
											src: "./src",
											expose: "src"
										},
										{
											src: "./",
											expose: "root"
										}
									]
								],
								[
									"react-css-modules",
									{
										context: SOURCE_DIR,
										generateScopedName: CSS_MODULES_HASH,
										filetypes: {
											".scss": "postcss-scss"
										}
									}
								]
							]
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": '"dev"'
		})
		//new require('webpack-bundle-analyzer').BundleAnalyzerPlugin()
	]
}

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const CSS_MODULES_HASH = '[local]__[hash:base64:7]'

const SOURCE_DIR = path.resolve(__dirname, 'src')
const PUBLIC_DIR = path.resolve(__dirname, 'public')


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
	devtool: 'source-map',
	module: {
		rules: [{
			// compile CSS modules
			test: /\.scss$/,
			include: SOURCE_DIR,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					// translates CSS into CommonJS
					loader: 'css-loader',
					options: { 
						autoprefixer: false, 
						sourceMap: true, 
						importLoaders: 1,
						modules: true,
						localIdentName: CSS_MODULES_HASH
					}
				}, 
				{ 	// prefix CSS
					loader: 'postcss-loader'
				}, 
				{ 	// compiles Sass to CSS
					loader: 'sass-loader'
				}]
			})
		},
		{
			test: /.js?$/,
			exclude: /node_modules/,
			use:  [{ 
				loader: 'babel-loader', 
				options: { 
					cacheDirectory: false,
					presets: ['es2015', 'react', 'stage-2'],
					"plugins": [[
							"module-alias", [{ 
								"src": "./src", 
								"expose": "src" 
							},{ 
								"src": "./", 
								"expose": "root" 
							}]
						],[
							"import", {
								"libraryName": "antd",
								"style": true
							}
						],[
							"react-css-modules", {
								context: SOURCE_DIR,
								generateScopedName: CSS_MODULES_HASH,
								filetypes: {
									".scss" : "postcss-scss"
								}
							}
						]
					]
				} 
			}]
		}]
	},
	plugins: [	
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		}),
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: {
				warnings: false, // Suppress uglification warnings
				dead_code: true,
				unused: true,
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				screw_ie8: true
			},
			sourceMap: false,
			output: {
				comments: false
			},
			exclude: [/\.min\.js$/gi] // skip pre-minified libs
		}),
		new ExtractTextPlugin({
			filename: "css/app.css",
			ignoreOrder: true
		})
	]
}
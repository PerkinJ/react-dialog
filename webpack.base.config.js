var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: false,
	entry: [
		"webpack-dev-server/client?http://localhost:8080",
  		'webpack/hot/only-dev-server',
		"./app/index.js"
	],
	output: {
		path: path.join(__dirname, 'dest'),
		publicPath: "/dest/",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /(node_modules|bower_components)/,
				query: {
					presets:['react', 'es2015']
				}
			},
			{
	            test: /\.(sass|scss)$/,
	            // 同上
	            loaders: ['style-loader','css-loader', 'autoprefixer-loader', 'sass-loader'],
	        },
		]
	},
	plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}
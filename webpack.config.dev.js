const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');


module.exports = {
	devtool: "source-map",
	entry: [
		"webpack-dev-server/client?http://localhost:8080",
  		'webpack/hot/only-dev-server',
		path.resolve(__dirname, 'app/index.js')       // 定义入口文件
	],
	output: {
		path: path.resolve(__dirname, '/build'),
		filename: 'bundle.js',
    	publicPath: 'http://localhost:8080/' // html引用路径
	},
	resolve: {                                      // resolve 指定可以被 import 的文件后缀
	    extensions: ['', '.js', '.jsx']
	  },
	module: {
		rules: [
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
	            exclude: /(node_modules|bower_components)/,

	            // 同上
	            loaders: ['style-loader','css-loader', 'autoprefixer-loader', 'sass-loader'],
	        },
	        {
		        test: /\.(jpe?g|png|gif|svg)$/i,
		        loaders: [
		          'url?limit=10000&name=img/[hash:8].[name].[ext]',
		          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
		        ]
		      }
		]
	},
	plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new UglifyJsPlugin({
            beautify:true,
            exclude:['/node_modules/'],
            compress:{
                warnings:false
            },
            output:{
                comments:false
            }
        }),
        new HtmlWebpackPlugin({
	      template: 'index.html',
	      inject: 'body',
	      filename: 'index.html'
    	}),
    	new webpack.DefinePlugin({
	      'process.env.NODE_ENV': JSON.stringify('development'),
	      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
	    }),
	    new OpenBrowserPlugin({ url: 'http://localhost:8080/' }),
	    new DashboardPlugin()
    ]
}
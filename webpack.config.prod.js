const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	  devtool: 'cheap-source-map',
	  entry: [
	    'webpack-dev-server/client?http://localhost:9090',
	    path.resolve(__dirname, 'app/index.js')
	  ],
	  output: {
	    path: path.resolve(__dirname, 'build'),
	    filename: '[chunkhash:8].bundle.js',
	    publicPath: './'
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
		            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
		            'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
		        ]
	    	}
		  ]
		},
		plugins: [
	    new webpack.DefinePlugin({
	      'process.env.NODE_ENV': JSON.stringify('production'),
	      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
	    }),
	    // new UglifyJsPlugin({
	    //   compress: {
	    //     warnings: false
	    //   }
	    // }),
	    new HtmlWebpackPlugin({
	      template: 'index.html',
	      filename: 'index.html',
	      inject: true
	    }),
	    new OpenBrowserPlugin({ url: 'http://localhost:9090/' })
	  ]
}

module.exports = config;
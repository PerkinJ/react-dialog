const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');

// 设置开发环境 
fs.open('./config/env.js', 'w', function (err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) { });
});

module.exports = merge(webpackBaseConfig, {
	// source-map
    devtool: false,
    // 输出目录
    output: {
        // 一级目录
        publicPath: '/public/',
        // 二级目录
        // [name] 表示使用 entry 里的name
        filename: 'js/[name].js',
        // 异步加载模块的目录及名字
        chunkFilename: 'js/[name].chunk.js'
    },
    devServer: {
        // 通俗的说就是 webpack-dev-server 使用的 HTML 文件目录
        contentBase: './',
        // 端口
        port: 8080,
        // 启动 server 时是否自动打开浏览器窗口
        // open: true,

        // 解决办法：historyApiFallback server端接受到任何请求都会先浏览器返回 index.html ，在Vue-router 处理这条路由信息
        historyApiFallback: true,
        // server 代理
        proxy: {
            // key:拦截 API 请求的前缀，可以是正则表达式；value：转发的目标地址
            // '/api': 'http://192.168.2.163:9004',
            // '/backend': 'http://192.168.2.163:9004',
        }
    },
    plugins: [
	    new webpack.DefinePlugin({
    		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		 // 初始化插件，提取 CSS
        new ExtractTextPlugin({
            // 配置二级目录及文件名
            filename: 'css/[name].css',
            // 是否从所有的 chunk 中提取CSS
            allChunks: true
        }),
        // 提取所有 JS 文件中公共代码，实现浏览器按需加载
        new webpack.optimize.CommonsChunkPlugin({
            // name 与 entry 里的 name 一致，表示与 entry 里的 libs 文件合并，否则会生成单独的文件
            name: 'libs',
            filename: 'js/libs.js'
        }),
    ]
    
})
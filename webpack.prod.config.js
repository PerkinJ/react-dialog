const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');

// 同 dev.config
fs.open('./src/config/env.js', 'w', function (err, fd) {
    const buf = 'export default "production";';
    fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) { });
});

const delFiles = dir => {
    // existsSync 检测文件是否存在 存在返回 true
    if (!fs.existsSync(dir)) {
        return
    }
    // readdirSync 读取指定目录下的文件，返回一个包含文件名的数组
    let files = fs.readdirSync(dir)
    files.forEach(file => {
        let filePath = `${dir}/${file}`;
        // statSync(file).isDirectory() 返回该文件是否是文件夹
        if (fs.statSync(filePath).isDirectory()) {
            delFiles(filePath)
        } else {
            // 删除指定文件
            fs.unlinkSync(filePath)
        }
    })
    // 删除指定文件夹
    fs.rmdirSync(dir)
    // console.log(`string`.color) node color 用于在控制台输入带 color 的 log
    console.log(`delete ${dir}/ success`.green);

}

try {
    // 删除指定目录的文件
    delFiles('./public');
    delFiles('./html');
} catch (error) {
    console.log(error);
    console.log(`delete error`);
    // 退出 node 程序
    process.exit()
}

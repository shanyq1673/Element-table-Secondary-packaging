'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

module.exports = {
  dev: {

    // Paths
    env: require('./dev.env'), // 使用 config/dev.env.js 中定义的编译环境
    assetsSubDirectory: 'static', // 编译输出的二级目录
    assetsPublicPath: '/', // 编译发布的根目录
    proxyTable: {
        '/': {
            target: 'http://127.0.0.1:3000',
            changeOrigin: true,
            pathRewrite: { '^/': '' }
        }
    }, // 需要 proxyTable 代理的接口(可跨域)
    // host: '192.168.3.125',
    host: 'localhost',
    port: 8080,
    autoOpenBrowser: true, // 自动打开浏览器窗口
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,

    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    env: require('./prod.env'), // 使用 config/prod.env.js 中定义的编译环境
    index: path.resolve(__dirname, 'dist/index.html'), // 编译输出的 index.html 文件

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'), // 编译输出的静态资源路径
    assetsSubDirectory: '', // 编译输出的二级目录
    assetsPublicPath: '', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'], // 需要使用 gzip 压缩的文件扩展名
    bundleAnalyzerReport: process.env.npm_config_report
  }
}

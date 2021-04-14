/*
 * @Author: your name
 * @Date: 2020-12-24 09:46:43
 * @LastEditTime: 2021-04-13 23:44:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/vue.config.js
 */
const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
function resolve(dir) {
  return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}
module.exports = {
  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: './dist',
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: "assets",
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  /* 代码保存时进行eslint检测 */
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  parallel: require("os").cpus().length > 1,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/index.scss";`
        // additionalData:`@import "${resolve('./src/scss/variables.scss')};"`
      }
    }
  },
  chainWebpack: (config) => {
    config
    .resolve
    .alias
    .set('@', resolve('./src'))

    config.optimization
      .minimizer('terser')
      .tap(args => {
        const { terserOptions } = args[0]
        terserOptions.keep_classnames = true
        terserOptions.keep_fnames = true
        return args
      }) 

    config
    .module
    .rule("images")
    .test(/\.(jpg|png|gif)$/)
    .use("url-loader")
    .loader("url-loader")
    .options({
        limit:10,
        // publicPath: 'https://oss.xx.com/img' ,
        outputPath: 'assets/images',
        name: '[name].[ext]',
    })
    .end()
  }, 
  // configureWebpack:{
  //   plugins: [
  //     new UglifyJsPlugin({
  //         uglifyOptions: {
  //             compress: {
  //                 warnings: false
  //             },
  //             keep_classnames: true,
  //             mangle: true,
  //             output: {
  //                 beautify: true
  //             }
  //         }
  //     })
  // ]
  // }
}
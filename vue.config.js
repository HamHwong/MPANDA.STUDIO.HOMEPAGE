const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}
module.exports = {
  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: process.env.VUE_APP_FLAG,
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: "assets",
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  /* 代码保存时进行eslint检测 */
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/variable.scss";` //引入全局变量    
      } 
    } 
  },
  chainWebpack: (config) => {
    config.resolve.alias.
    set('@', resolve('./src'))
  }
}
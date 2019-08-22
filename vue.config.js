import { serverUrl } from './config/env'
const vuxLoader = require('vux-loader')
const themeConfig = {
  name: 'less-theme',
  path: 'src/style/less/theme.less'
}
module.exports = {
  configureWebpack: config => {
    vuxLoader.merge(config, {
      plugins: ['vux-ui', themeConfig]
    })
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...

    } else {
      // 为开发环境修改配置...

    }
  },
  devServer: {

    // Paths
    // assetsSubDirectory: 'static',
    // assetsPublicPath: '/',
    proxy: {
      '/v': {
        target: serverUrl,
        // target: 'http://localhost:9988',
        changeOrigin: true // 是否在本机创建target地址的虚拟服务，避免跨域问题
      },
      '/api': {
        target: 'http://api.budejie.com',
        changeOrigin: true // 是否在本机创建target地址的虚拟服务，避免跨域问题
      },
      '/touch': {
        target: 'https://3g.163.com',
        changeOrigin: true // 是否在本机创建target地址的虚拟服务，避免跨域问题
      }
    }

    // Various Dev Server settings
    // host: 'localhost', // can be overwritten by process.env.HOST
    // port: 8899 // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    // autoOpenBrowser: true,
    // errorOverlay: true,
    // notifyOnErrors: true,
    // poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // /**
    //  * Source Maps
    //  */

    // // https://webpack.js.org/configuration/devtool/#development
    // devtool: 'cheap-module-eval-source-map',

    // // If you have problems debugging vue-files in devtools,
    // // set this to false - it *may* help
    // // https://vue-loader.vuejs.org/en/options.html#cachebusting
    // cacheBusting: true,

    // cssSourceMap: true
  }
}

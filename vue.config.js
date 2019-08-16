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
  }
}

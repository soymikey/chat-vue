//  配置编译环境和线上环境之间的切换

//  baseUrl: 域名地址
//  routerMode: 路由模式
//  imgBaseUrl: 图片所在域名地址

let baseUrl = 'http://192.168.1.120/'
let serverUrl = 'http://192.168.1.120:9988'
let routerMode = 'hash'
let imgUrl = ''
let socketIo = 'http://192.168.1.120:9988/'

if (process.env.NODE_ENV === 'development') {
  imgUrl = 'http://192.168.1.120:9988/'
} else if (process.env.NODE_ENV === 'production') {

}
// if (process.env.NODE_ENV === 'development') {
//   imgBaseUrl = 'http://localhost:4000/img/'
// } else if (process.env.NODE_ENV === 'production') {
//   baseUrl = '//elm.cangdu.org'
//   imgBaseUrl = '//elm.cangdu.org/img/'
// }

export default {
  baseUrl, routerMode, imgUrl, socketIo, serverUrl
}
// export { baseUrl, routerMode, imgUrl, socketIo, serverUrl }

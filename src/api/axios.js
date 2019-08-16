import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'
let instance = axios.create({
  baseURL: '/'
})

// const instance = axios.create({
//   baseURL:
//     process.env.NODE_ENV === 'development'
//       ? 'http://127.0.0.1:4000/api'
//       : 'http://pos.migaox.com/api', // api的base_url
//   timeout: 20000 // 请求超时时间
// })
// http request 请求拦截器，有token值则配置上token值
/* axios.interceptors.request.use(
 config => {
 if (token) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
 config.headers.Authorization = token;
 }
 return config;
 },
 err => {
 return Promise.reject(err);
 }); */

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token

instance.interceptors.response.use(
  response => { // 拦截未登录
    if (response.data.status === 0) {
      router.replace('/')
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 这里写清除token的代码
          router.replace('/')
          Message.error('登录信息过期或未授权，请重新登录！')
          break
        case 403:
          Message.error('拒绝访问！')
          break
        case 404:
          Message.error('请求错误,未找到该资源！')
          break
        case 500:
          Message.err('服务器出问题了，请稍后再试！')
          break
        default:
          Message.err(`连接错误 ${error.response.status}！`)
          break
      }
    }
    return Promise.reject(error.response.data)
  })

export default {
  get (url, params) {
    return new Promise((resolve, reject) => {
      instance.get(url, { params }).then(r => {
        resolve(r.data)
      })
    })
  },
  post (url, params) {
    return new Promise((resolve, reject) => {
      instance.post(url, params).then(r => {
        resolve(r.data)
      })
    })
  }
}

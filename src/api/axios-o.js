import axios from 'axios'

import router from '../router'

const toast = (text, type) => {
  this.$vux.toast.show({
    text,
    type
  })
}
// let instance = axios.create({
//   baseURL: '/'
// })

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8899/'
      : 'http://pos.migaox.com/', // api的base_url
  timeout: 20000 // 请求超时时间
})
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
          router.replace('/register')
          toast('登录信息过期或未授权，请重新登录', 'cancel')

          break
        case 403:
          toast('拒绝访问！', 'cancel')
          break
        case 404:
          toast('请求错误,未找到该资源！', 'cancel')
          break
        case 500:
          toast('服务器出问题了，请稍后再试！', 'cancel')

          break
        default:
          toast(`连接错误 ${error.response.status}！`, 'cancel')

          break
      }
    }
    return Promise.reject(error)
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

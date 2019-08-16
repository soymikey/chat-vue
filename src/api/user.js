import axios from './axios'

export default {
  getUser (params) { // 获取所有用户
    return axios.get('v/user/getUser', params)
  },
  login (params) { // 登录
    return axios.post('v/user/login', params)
  },
  signUp (params) { // 注册
    return axios.post('v/user/signUp', params)
  },
  loginOut () { // 注册
    return axios.post('v/user/loginOut')
  },
  getUserInfo (params) { // 获取用户信息
    return axios.post('v/user/getUserInfo', params)
  },
  upUserInfo (params) { // 设置主题
    return axios.post('v/user/upUserInfo', params)
  },
  getUserDetail () { // 获取个人设置用户信息
    return axios.post('v/user/getUserDetail')
  },
  getVchatInfo () { // 获取vchat官方账号信息
    return axios.post('v/user/getVchatInfo')
  },
  addConversitionList (params) { // 添加会话
    return axios.post('v/user/addConversitionList', params)
  },
  removeConversitionList (params) { // 移除会话
    return axios.post('v/user/removeConversitionList', params)
  },
  huntFriends (params) { // 添加好友
    return axios.post('v/user/huntFriends', params)
  }
}

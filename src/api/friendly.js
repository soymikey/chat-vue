/**
 * Created by wyw on 2018/11/1.
 */
import axios from './axios'

export default {
  findMyfriends (params) { // 查找我的好友
    return axios.post('v/friend/findMyfriends', params)
  },
  checkMyfriends (params) { // 查找我的好友
    return axios.post('v/friend/checkMyfriends', params)
  }
}

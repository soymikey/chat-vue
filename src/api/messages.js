/**
 * Created by wyw on 2018/12/6.
 */
import axios from './axios'

export default {
  removeMessage (params) { // 删除消息
    return axios.post('v/mes/removeMessage', params)
  },
  loadMoreMessages (params) { // 加载更多消息
    return axios.post('v/mes/loadMoreMessages', params)
  }
}

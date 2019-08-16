import axios from './axios'

export default {
  getExpression (params) { // 获取表情库
    return axios.post('v/expre/getExpression', params)
  }
}

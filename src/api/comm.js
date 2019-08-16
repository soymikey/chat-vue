import axios from './axios'

export default {
  uploadFile (params) { // 上传文件
    return axios.post('v/api/uploadFile', params)
  }
}

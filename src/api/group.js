import axios from './axios'

export default {
  createGroup (params) { // 新建群
    return axios.post('v/group/createGroup', params)
  },
  getMyGroup () { // 查找我的群
    return axios.post('v/group/getMyGroup')
  },
  getGroupUsers (params) {
    return axios.post('v/group/getGroupUsers', params)
  },
  huntGroups (params) {
    return axios.post('v/group/huntGroups', params)
  },
  getGroupInfo (params) {
    return axios.post('v/group/getGroupInfo', params)
  }
}

/**
 * Created by wyw on 2018/11/1.
 */
import axios from './axios'

export default {
  getJokes (type, page, maxtime) { // 获取段子
    return axios.get(`api/api_open.php?a=list&c=data&type=${type}&page=${page}&maxtime=${maxtime}`)
  }
}

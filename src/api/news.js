/**
 * Created by wyw on 2018/12/1.
 */
import axios from './axios'

export default {
  getHotNews (type, page) { // 获取头条
    return axios.get(`touch/reconstruct/article/list/${type}/${page}.html`)
  },
  getNewsDetail () {
    return axios.get(`ent/18/1201/13/E1UNO7VG00038FO9.html`)
  }
}

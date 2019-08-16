/**
 * Created by wyw on 2019/1/9.
 */
import axios from './axios'

export default {
  getTodoList () { // 查找日程
    return axios.post('v/todo/getTodoList')
  },
  addTodo (params) { // 添加日程
    return axios.post('v/todo/addTodo', params)
  },
  upTodo (params) { // 更新日程
    return axios.post('v/todo/upTodo', params)
  },
  delTodo (params) { // 删除日程
    return axios.post('v/todo/delTodo', params)
  }
}

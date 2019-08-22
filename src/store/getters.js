/**
 * Created by wyw on 2018/8/4.
 */
export default {
  unReadCount (state) {
    let count = 0
    state.unRead.forEach(v => {
      count += v.count
    })
    return count
  },
  getRequestList (state) {
    state.requestList = state.requestList.filter(r => r.status === '0')
    return state.requestList
  },
  getNewMes (state) {
    return state.newMes
  }
}

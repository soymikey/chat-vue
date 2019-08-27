<template>
  <div class="explore_container">
    <x-header>{{this.$route.params.name}}</x-header>
   <div v-transfer-dom>
      <loading :show="chatLoading" text="加载中"></loading>
    </div>
    <scroller lock-x height="-92" ref="scrollerEvent" >
      <div>
        <div ref="scrollerHeight">
          <div v-for="(item,index) in chatList" :key="index" class="coversation_box-container">
            <div v-if="item.type==='mine'" class="mine_container">
              <div class="mine_content">
                {{item.mes}}
                <span class="my_spike"></span>
              </div>
              <img class="img" :src="IMG_URL+item.avatar" />
            </div>
            <div v-else class="other_container">
              <img class="img" :src="IMG_URL+item.avatar" />
              <div class="other_content">
                {{item.mes}}
                <span class="other_spike"></span>
              </div>
            </div>
          </div>
          <!-- <div style="height:46px"></div> -->
        </div>
      </div>
    </scroller>

    <group style="position:fixed;bottom:0;width:100%;">
      <x-input type="text" placeholder="请输入消息" v-model="message" @on-enter="send">
        <i
          slot="label"
          style="padding-right:10px;display:block;"
          width="50"
          height="50"
          class="iconfont icon-message"
        ></i>
      </x-input>
    </group>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import env from '../../../config/env'
import api from '@/api'
import { formatTime } from '@/utils/utils'
import { setTimeout } from 'timers'
import { TransferDom } from 'vux'

export default {
  directives: {
    TransferDom
  },
  data () {
    return {
      // type 0 共有 1 群聊 2 好友
      navList: [
        { name: '聊天', type: 'group,friend', id: 0 },
        { name: '公告', type: 'group', id: 1 },
        { name: '聊天记录', type: 'group,friend', id: 2 }
      ],
      IMG_URL: env.imgUrl,
      currNav: 0,
      spread: false,
      chatList: [],
      message: '',
      showEmoji: {
        f: false
      },
      groupUsers: [], // 群成员
      uplaodVisible: {
        // 上传
        f: false
      },
      photoSwipeFlag: false, // 图片放大器
      photoSwipeUrl: '',
      onlineNum: 0, // 在线人数
      chatLoading: false,
      loadmoreLoading: false,
      groupUserList: [], // 长列表渲染
      offset: 1, // 群成员页码
      limit: 50
    }
  },
  sockets: {
    org (r) {
      if (r.roomid === this.currSation.id) {
        this.chatList.push(Object.assign({}, r, { type: 'org' }))
      }
    },
    mes (r) {
      if (
        r.roomid === this.currSation.id &&
        this.$route.name === 'conversation'
      ) {
        console.log('r', r)

        this.chatList.push(Object.assign({}, r, { type: 'other' }))
        this.$socket.emit('setReadStatus', {
          roomid: r.roomid,
          name: this.user.name
        })
        this.$store.commit('setUnRead', { roomid: r.roomid, clear: true })
        this.goToBottom()
      }
    },
    getHistoryMessages (r) {
      // 获取历史消息
      if (r.length) {
        // this.$emit('NewMes', r[r.length - 1])
        this.$store.commit('setUnRead', {
          roomid: r[0].roomid,
          clear: true,
          count: 0,
          lastMes: r[r.length - 1].mes
        })
      }

      this.chatList = r.map(v => {
        if (v.type !== 'org') {
          if (v.name === this.user.name) {
            v.type = 'mine'
          } else {
            v.type = 'other'
          }
        }
        return v
      })
      this.goToBottom()

      this.chatLoading = false
    }
  },

  created () {},

  mounted () {

  },
  computed: {
    ...mapState(['user', 'OnlineUser', 'currSation'])

  },
  watch: {
    currSation: {
      // 当前会话

      handler (v) {
        if (!v.id) {
          this.chatList = []
        }

        this.offset = 1
        this.groupUserList = []

        this.currNav = 0 // 标签选中第一个
        if (v.type === 'group' || v.type === 'friend') {
          if (v.type === 'group') {
            this.getGroupUsers(v.id)
          }
          this.chatLoading = true

          this.$socket.emit('setReadStatus', {
            roomid: v.id,
            name: this.user.name
          })
          this.$store.commit('setUnRead', { roomid: v.id, clear: true })
          this.$socket.emit('getHistoryMessages', {
            roomid: v.id,
            offset: 1,
            limit: 100
          })
        }
      },
      deep: true,
      immediate: true
    },

    OnlineUser: {
      // 在线成员
      handler (obj) {
        if (this.currSation.type && this.currSation.type === 'group') {
          this.getGroupUsers(this.currSation.id)
        }
      },
      immediate: true,
      deep: true
    },
    currTool (v, old) {
      if (!v) {
        document.documentElement.removeEventListener('click', this.watchMouse)
      }
    }
  },
  methods: {
    goToBottom () {
      if (this.$refs.scrollerHeight.clientHeight > document.body.clientHeight) {
        const scrollerInnerHeight = this.$refs.scrollerHeight.clientHeight - document.body.clientHeight + 120
        console.log('scrollerInnerHeight', scrollerInnerHeight)
        this.$refs.scrollerEvent.reset({ top: scrollerInnerHeight })
      }
    },
    send (params, event, type = 'mess') {
      // 发送消息
      this.goToBottom()
      if (!this.message && !params) {
        return
      }
      let val = {
        name: this.user.name,
        mes: this.message,
        time: formatTime(new Date()),
        avatar: this.user.photo,
        nickname: this.user.nickname,
        read: [this.user.name],
        roomid: this.currSation.id,
        style: 'mess',
        userM: this.user.id
      }
      if (type === 'emoji') {
        // 发送表情
        val.style = 'emoji'
        val.mes = '表情'
        val.emoji = params
      } else if (type === 'img') {
        val.style = 'img'
        val.mes = '图片'
        val.emoji = params
      } else if (type === 'file') {
        val.style = 'file'
        val.mes = params.name
        val.emoji = params.response.data
      }
      this.chatList.push(Object.assign({}, val, { type: 'mine' }))
      this.$socket.emit('mes', val)
      this.$store.commit('setUnRead', {
        roomid: val.roomid,
        count: 0,
        lastMes: val.mes
      })
      console.log('tyope', type)

      if (type === 'mess') {
        // 发送文字
        this.message = ''
      }
    },

    lookPhoto (url) {
      // 查看原图
      this.photoSwipeUrl = url
      this.photoSwipeFlag = true
    },
    uploadFileSuccess (res, file) {
      // 上传成功
      if (file.raw.type.indexOf('image') > -1) {
        this.send(res.data, 'img')
      } else {
        this.send(file, 'file')
      }
      this.uplaodVisible.f = false
    },
    InmageChange () {
      // 发送图片
      let f = this.$refs['chooseInmage'].files[0]
      if (f.type.indexOf('image') === -1) {
        this.$message.error('只能上传图片!')
        return
      }
      const isLt1M = f.size / 1024 / 1024 < 1
      if (!isLt1M) {
        this.$message.error('图片大小不能超过 1MB!')
        return
      }
      let formdata = new FormData()
      formdata.append('f', f)
      api.uploadFile(formdata).then(r => {
        if (r.code === 0) {
          this.send(r.data, 'img')
        } else {
          this.$message({
            message: '上传失败',
            type: 'warning'
          })
        }
      })
      this.$refs['chooseInmage'].value = ''
    },
    getGroupUserStatus (obj) {
      // 群成员在线状态
      this.groupUsers.forEach((v, i) => {
        let flag = false
        Object.keys(obj).forEach(k => {
          if (k === v.userName) {
            flag = true
          }
        })
        this.$set(this.groupUsers, i, Object.assign({}, v, { status: flag }))
      })
      this.onlineNum = this.groupUsers.filter(v => v.status).length
    },
    setCurrNav (i) {
      this.currNav = i
    },
    spreadInput () {
      this.spread = !this.spread
      this.$nextTick(_ => {
        this.$refs['searchMember'].focus()
      })
    },
    loadmore () {
      this.loadmoreLoading = true
      this.offset += 1
      setTimeout(v => {
        let page = (this.offset - 1) * this.limit
        this.groupUserList = this.groupUserList.concat(
          this.groupUsers.slice(page, page + this.limit)
        )
        this.loadmoreLoading = false
      }, 1000)
    },
    getGroupUsers (id) {
      // 获取群成员
      let params = {
        groupId: id
      }
      api.getGroupUsers(params).then(r => {
        if (r.code === 0) {
          this.groupUsers = r.data
          let page = (this.offset - 1) * this.limit
          this.groupUserList = this.groupUsers.slice(page, page + this.limit)
          /* console.log(this.groupUsers); */
          this.getGroupUserStatus(this.OnlineUser)
        }
      })
    },

    chooseEmojiDefault (em) {
      this.message += em
      this.showEmoji.f = false
    },
    chooseEmoji (url) {
      this.send(url, 'emoji')
      this.showEmoji.f = false
    },
    clear () {
      // 清空
      this.message = ''
    }
  }
}
</script>
<style lang="scss">
.explore_container {
  background-color: #f7f7fa;
}

.coversation_box-container {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  .mine_container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .mine_content {
      background-color: #5fc9f8;
      padding: 10px;
      border-radius: 3%;
      word-break: break-all;
      margin-right: 10px;
      max-width: 60%;
      position: relative;
      .my_spike {
        background: #5fc9f8;
        height: 8px;
        width: 8px;
        position: absolute;
        right: -5px;
        top: 4px;
        transform: translate(-50%, -50%);
        transform: rotate(45deg);
      }
    }
    .img {
      border-radius: 50%;
      width: 45px;
      height: 45px;
    }
  }
  .other_container {
    width: 100%;
    display: flex;
    justify-content: flex;
    align-items: center;
    .other_content {
      background-color: pink;
      padding: 10px;
      border-radius: 3%;
      word-break: break-all;
      margin-left: 10px;
      max-width: 60%;
      position: relative;
      .other_spike {
        background: pink;
        height: 8px;
        width: 8px;
        position: absolute;
        left: -5px;
        top: 4px;
        transform: translate(-50%, -50%);
        transform: rotate(45deg);
      }
    }
    .img {
      border-radius: 50%;
      width: 45px;
      height: 45px;
    }
  }
}
</style>

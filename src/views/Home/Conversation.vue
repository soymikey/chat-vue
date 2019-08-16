<template>
  <div class="explore_container">
    <x-header>Michael</x-header>
    <scroller
      lock-x
      :height="scrollBoxHeight"
      @on-scroll-bottom="onScrollBottom"
      ref="scrollerBottom"
      :scroll-bottom-offst="200"
    >
      <div>
        <!-- <cell v-for="item in messageList" :key="item">

          <span slot="title" style="color:green;">
             <div :class="item.sender==='michael'?'other_message_box':'my_message_box'">
              {{item.message}}
               <span :class="item.sender==='michael'?'other_spike':'my_spike'"></span>
            </div>
          </span>
          <img
            class="my_avartar"
            :slot=" item.sender==='michael'?'value':'icon'"
            width="35"
            style="display:block;"
            :src="item.sender==='michael'?me:other"
          />
        </cell>-->
        <div v-for="item in messageList" :key="item" class="coversation_box-container">

          <img class="other_avatar" width="35" height="35" :src="item.sender==='michael'?me:other" />
          <div :class="item.sender==='michael'?'other_message_box':'my_message_box'">
            {{item.message}}
            <span :class="item.sender==='michael'?'other_spike':'my_spike'"></span>
          </div>
          <img class="my_avartar"  width="35" height="35" :src="item.sender==='michael'?me:other" />
        </div>
      </div>
    </scroller>

    <group style="position:absolute;bottom:0;width:100%;">
      <x-input name="mobile" placeholder="请输入消息" style="width:100%;">
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
export default {
  data () {
    return {
      scrollBoxHeight: '',
      me: require('../../assets/me.jpg'),
      other: require('../../assets/other.jpg'),
      messageList: [
        {
          sender: 'michael',
          image: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          message:
            'hello i am michael message1hello i am michael message1hello i am michael message1hello i am michael message1',
          time: '13:26'
        },
        {
          sender: 'lucy',
          image: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          message: 'hello i am lucy message1',
          time: '13:26'
        },
        {
          sender: 'michael',
          image: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          message:
            'hello i am michael message1hello i am michael message1hello i am michael message1hello i am michael message1',
          time: '13:26'
        },
        {
          sender: 'lucy',
          image: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          message: 'hello i am lucy message1',
          time: '13:26'
        },
        {
          sender: 'michael',
          image: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          message:
            'hello i am michael message1hello i am michael message1hello i am michael message1hello i am michael message1',
          time: '13:26'
        },
        {
          sender: 'lucy',
          image: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          message: 'hello i am lucy message1',
          time: '13:26'
        },
        {
          sender: 'michael',
          image: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          message:
            'hello i am michael message1hello i am michael message1hello i am michael message1hello i am michael message1',
          time: '13:26'
        },
        {
          sender: 'lucy',
          image: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          message: 'hello i am lucy message1',
          time: '13:26'
        },
        {
          sender: 'michael',
          image: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          message:
            'hello i am michael message1hello i am michael message1hello i am michael message1hello i am michael message1',
          time: '13:26'
        },
        {
          sender: 'lucy',
          image: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          message: 'hello i am lucy message1',
          time: '13:26'
        },
        {
          sender: 'michael',
          image: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          message:
            'hello i am michael message1hello i am michael message1hello i am michael message1hello i am michael message1',
          time: '13:26'
        },
        {
          sender: 'lucy',
          image: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          message: 'hello i am lucy message1',
          time: '13:26'
        },
        {
          sender: 'lucy',
          image: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          message: 'hello i am lucy message1',
          time: '13:26'
        },
        {
          sender: 'lucy',
          image: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          message: 'hello i am lucy message1',
          time: '13:26'
        },
        {
          sender: 'michael',
          image: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          message: 'hello i am michael message2',
          time: '13:26'
        },
        {
          sender: 'lucy',
          image: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          message: 'hello i am lucy message2',
          time: '13:26'
        }
      ]
    }
  },
  created () {},
  mounted () {
    this.scrollBoxHeight =
      document.documentElement.clientHeight - 46 - 46 + 'px'
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>
<style lang="scss">
.explore_container {
  background-color: #f7f7fa;
}
// .my_message_box {
//   background-color: #fff;
//   padding: 10px;
//   width: 75%;
//   position: relative;
//   margin-left: 5%;
// }
// .my_spike {
//   display: block;
//   background: #fff;

//   height: 10px;
//   width: 10px;
//   position: absolute;
//   top: 15%;
//   left: -2%;
//   transform: translate(-50%, -50%);
//   transform: rotate(45deg);
// }
// .other_message_box {
//   background-color: #fff;
//   padding: 10px;
//   width: 75%;
//   position: relative;
//   left: 60px;
// }
// .other_spike {
//   display: block;
//   background: #fff;
//   height: 10px;
//   width: 10px;
//   position: absolute;
//   top: 15%;
//   right: -2%;
//   transform: translate(-50%, -50%);
//   transform: rotate(45deg);
// }
// .weui-cell:before{
// border:0px solid #D9D9D9
// }
// .weui-cell:after{
// border:0px solid #D9D9D9
// }
.coversation_box-container {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  margin-top: 10px;
  .other_avatar {
    display: block;
    flex: 1;
    padding: 10px
  }
  .my_avartar {
    display: block;
    flex: 1;
     padding: 10px
  }
  .other_message_box {
    flex: 8;
    background-color: #fff;
    padding: 10px
  }
  .my_message_box {
    flex: 8;
     background-color: #fff;
    padding: 10px
  }
}
</style>

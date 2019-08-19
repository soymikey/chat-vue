<template>
  <div class="explore_container">
    <x-header>Michael</x-header>
    <scroller
      lock-x
      :height="scrollBoxHeight"
      @on-scroll-bottom="onScrollBottom"
      ref="scrollerBottom"
      :scroll-bottom-offst="250"
    >
      <div>
        <div v-for="item in messageList" :key="item" class="coversation_box-container">
          <div class="other_avatar_container">
            <img
              width="35"
              height="35"
              :src="item.sender==='michael'?me:other"
              v-show="item.sender!=='michael'"
            />
          </div>

          <div :class="item.sender==='michael'?'my_message_box':'other_message_box'">
            {{item.message}}
            <span :class="item.sender==='michael'?'my_spike':'other_spike'"></span>
          </div>
          <div class="my_avartar-container">
            <img
              width="35"
              height="35"
              :src="item.sender==='michael'?me:other"
              v-show="item.sender==='michael'"
            />
          </div>
        </div>
        <div style="height:30px"></div>
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

.coversation_box-container {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  margin-top: 10px;
  .other_avatar_container {
    display: flex;
    align-items: center;
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
  }
  .my_avartar-container {
    display: flex;
    align-items: center;
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
  }
  .other_message_box {
    flex: 8;
    background-color: #fff;
    padding: 10px;
    border-radius: 3%;
    position: relative;
  }
  .my_message_box {
    flex: 8;
    background-color: #5fc9f8;
    padding: 10px;
    border-radius: 3%;
    position: relative;
  }
  .my_spike {
    background: #5fc9f8;
    height: 8px;
    width: 8px;
    position: absolute;
    right: -3px;
    top: 4px;

    transform: translate(-50%, -50%);
    transform: rotate(45deg);
  }
  .other_spike {
    background: #fff;
    height: 8px;
    width: 8px;
    position: absolute;
    right: -3px;
    top: 4px;

    transform: translate(-50%, -50%);
    transform: rotate(45deg);
  }
}

</style>

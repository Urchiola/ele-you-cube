<template>
  <div class='tab'>
    <cube-tab-bar :showSlider=true
      :useTransition=false
      v-model="selectedLabel"
      :data="tabs"
      ref="tabBar"
      class="border-bottom-1px" >
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        :loop=false
        :auto-play=false
        :show-dots=false
        :initial-index="index"
        ref="slide"
        @change="onChange"
        @scroll="onScroll"
        :options ="slideOptions"
      >
        <cube-slide-item v-for= "(tab,index) in tabs" :key = "index">
          <component :is="tab.component" :data ="tab.data"  :innitialIndex = innitialIndex ref="aboutGoods"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>

export default {
  name: 'tabs',
  props: {
    tabs: {
      type: Array,
      default() {
        return []
      }
    },
    innitialIndex: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      // 标题
      index: 2, // this.innitialIndex,
      // scroll 需默认配置数据
      slideOptions: {
        listenScroll: true, //  监听滚动开
        probeType: 3, //  派发事件；1.会截流,2.不会截流,3.在swipe情况，仍能派发scroll事件
        directionLockThreshold: 0 /* 同时水平和垂直滚动时锁定y方向 */
      },
      scrollOptions: {
        // directionLockThreshold: 0 /* 同时水平和垂直滚动时锁定x方向 */
      }
    }
  },
  computed: {
    // 选择切换tabs
    selectedLabel: {
      get() {
        return this.tabs[this.index].label
      },
      set(newVal) {
        // 找出点击当tabs.label和tabs一致的label的index.并返回index
        this.index = this.tabs.findIndex((value) => {
          return value.label === newVal
        })
      }
    }
  },
  methods: {
    // 点击标题到 内容的联动
    onChange(current) {
      // 获取当前内容的 index 并绑定到 this.index 实现联动
      this.index = current
      const component = this.$refs.aboutGoods[current]
      //  有 component 并 有fetch方法
      if (component && component.fetch) {
        component.fetch()
      }
    },
    //  内容到标题的过渡缓动 联动
    onScroll(pos) {
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth // bar 整个的总宽度
      const slideWidth = this.$refs.slide.slide.scrollerWidth // slide 容器的总宽度
      const transform = Math.abs(pos.x) * tabBarWidth / slideWidth // 取整后再 计算
      this.$refs.tabBar.setSliderTransform(transform) // 页面结构中同时 :iseTransition=false 关闭默认动画
    }
  },
  mounted() {
    this.onChange(this.index)
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@import "~common/stylus/variable"
  .tab
    display: flex
    flex-direction:column
    height:100%
    >>> .cube-tab
      padding: 10px 0
    .slide-wrapper
      flex:1
      overflow:hidden
</style>

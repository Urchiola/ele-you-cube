<!-- header 组件 -->
<template>
  <div class="header" @click='showDetail'>
    <div class="content-wrap">
      <div class = 'avatar'>
        <img width="64" height="64" :src= "pseller.avatar" >
      </div>
      <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class = 'name'>{{pseller.name}}</span>
          </div>
          <div class="description">
            {{pseller.description}}/{{pseller.deliveryTime}}
          </div>
          <div class="supports" v-if="pseller.supports">
            <supportIco :size=1 :type='pseller.supports[0].type'></supportIco>
            <span class="text">{{pseller.supports[0].description}}</span>
          </div>
      </div>
      <div v-if = "pseller.supports" class="support-count">
        <span class="count">{{pseller.supports.length}}</span>
        <i class="iconfont icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrap">
      <span class="bulletin-title"></span><span class="bulletin-content">{{pseller.bulletin}}</span>
      <i class="iconfont icon-keyboard_arrow_right"></i>
    </div>
    <!-- header背景图-->
    <div class="head-bg"><img :src="pseller.avatar" width="100%" height="100%"></div>
  </div>
</template>

<script>
// const Discount = '优惠信息'
// const Notice = '商家公告'
import supportIco from '../support-ico/support-ico'
export default {
  // 注册使用组件
  name: 'v-header',
  data() {
    return {
      detailShow: false,
      Discount: '',
      Notice: ''
    }
  },
  components: {
    supportIco
  },
  props: {
    pseller: {
      type: Object
    }
  },
  created() {
    // 商家的活动类型，满减，打折，单人套餐，支持发票，，保障
    // 后台返回的类型下标，找到对应的样式
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    this.Discount = '优惠信息'
    this.Notice = '商家公告'
  },
  methods: {
    showDetail() {
      //  cubeui 实现详情页展示
      this.headerDetailComp = this.headerDetailComp || this.$createHeaderDetail({
        $props: {
          pseller: 'pseller'
        }
      })
      this.headerDetailComp.show()
    }
  }

  //   computed: {},

//   mounted: {},
}

</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@import 'common/stylus/mixin.styl';

.header
  color:#fff
  position :relative
  background:rgba(7,17,27,0.4)
  overflow:hidden
  .content-wrap
    position :relative
    padding:24px 12px 18px 24px
    font-size:0
    .avatar
      display:inline-block
      img
        border-radius:2px
    .content
      display:inline-block
      font-size:14px
      margin-left:16px
      .title
         margin: 2px 0 8px 0
        .brand
          display: inline-block
          width: 30px
          height: 18px
          bg-image('brand')
          background-size:30px 18px
          background-repeat :no-repeat
        .name
          margin-left:6px
          font-size 16px
          line-height :18px
          font-weight:bold
          vertical-align:top
      .description
        margin-bottom: 10px
        line-height: 12px
        font-weight:200
        font-size: 12px
      .supports
        .icon
          display :inline-block
          vertical-align:top
          width: 12px
          height:12px
          margin-right 4px
          background-size 12px 12px
          background-repeat :no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .text
          line-height:12px
          font-weight: 200
          font-size:12px

    .support-count
      position :absolute
      right 12px
      bottom 19px
      padding:0 8px
      height 24px
      line-height 24px
      border-radius: 14px
      background:rgba(0,0,0,0.2)
      text-align :center
      .count
        font-size: 12px
        // display:inline-block
        //vertical-align:top
      .icon-keyboard_arrow_right
          margin-left:2px
          font-size:12px
          vertical-align: sub

  .bulletin-wrap
      height 28px
      line-height:28px
      padding:0 22px 0 12px
      white-space:nowrap
      overflow:hidden
      text-overflow:ellipsis
      background-color:rgba(7,17,27,0.2)
      position :relative
      .bulletin-title
        display:inline-block
        width:22px
        height:12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat:no-repeat
        vertical-align:middle
      .bulletin-content
        margin:0 4px
        font-size:12px
        color:rgb(255,255,255)
        font-weight :200
      .icon-keyboard_arrow_right
        position: absolute
        font-size:12px
        right: 12px
        top: 10px

  //背景图片
  .head-bg
    position:absolute
    top:0
    left:0
    width:100%
    height:100%
    z-index:-1
    //filter:滤镜 模糊
    filter:blur(7px)
</style>

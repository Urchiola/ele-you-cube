<template>
  <transition name = 'fade'>
  <!-- 全屏浮层  css sticky footers 布局 -->
    <div class="detail" v-show ='visible' >
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{pseller.name}}</h1>
          <!-- 评星组件 -->
          <div class="detail-star">
          <v-star :size = "36" :score= '5.5'></v-star>
          </div>
          <!-- 标题组件 -->
          <div class="titleLines">
          <titleLine :titleName= "Discount"></titleLine>
          </div>
          <!-- 优惠信息列表 -->
          <!-- 警告：此处 track-by='$index' vue2.0 已经移除; (item,index) 可这样写 -->
          <ul class="supports">
            <li class="supports-item" :key ='index' v-for= '(item,index) in pseller.supports' >
              <!-- <span class='icon' :class="classMap[pseller.supports[index].type]" ></span> -->
              <supportIco :size=1 :type="index"></supportIco>
              <span class="text">{{pseller.supports[index].description}}</span>
            </li>
          </ul>
          <div>
          </div>
          <!-- 标题组件 -->
          <div class="titleLines">
          <titleLine :titleName= "Notice"></titleLine>
          </div>
          <h3 class="detail-bulletin">{{pseller.bulletin}}</h3>
        </div>
      </div>
      <div class="detail-close" @click='hide'> <i class="icon-close"></i></div>
    </div>
  </transition>
</template>

<script>
import star from '../star/star'
import titleLine from '../titleLine/titleLine'
import supportIco from '../support-ico/support-ico'

import popupMixins from 'common/mixins/mixins'
export default {
  name: 'header-detail',
  mixins: [popupMixins],
  props: {
    pseller: {
      type: Object
    },
    stateShow: {
      type: Number
    }
  },
  components: {
    'v-star': star,
    titleLine: titleLine,
    supportIco: supportIco
  },
  created() {
    // 商家的活动类型，满减，打折，单人套餐，支持发票，，保障
    // 后台返回的类型下标，找到对应的样式
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    this.Discount = '优惠信息'
    this.Notice = '商家公告'
  },
  methods: {
    
  },
  computed: {
  }
}

</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
// 弹出浮层
.detail
  position:fixed
  z-index: 100
  top:0
  left:0
  width:100%
  height:100%
  overflow:auto
  background:rgba(7,17,27,0.8)
  //  ~css sticky footer 布局
  .detail-wrapper
    min-height:100%
    width:100%
    // 内容区
    .detail-main
      margin-top: 64px
      padding-bottom :64px
      text-align :center
      .name
        font-size:16px
        font-weight:700
        color:rgb(255,255,255)
        line-height :16px
      .detail-star
        margin:16px 0 28px 0
      .titleLines
        width:80%
        margin:0 auto
      .supports
        width:80%
        margin:24px auto 28px auto
        text-align :left
        vertical-align:middle
        .supports-item
          .text
            color:#fff
            text-align :center
            vertical-align: middle
          padding:0 12px
          .icon
            display :inline-block
            vertical-align:middle
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

      .detail-bulletin
        width:80%
        margin:24px  auto 0 auto
        padding:0 12px
        font-size:12px
        font-weight :200
        color:rgb(255,255,255)
        line-height :24px
        text-align :left
  //弹出层关闭按钮
  .detail-close
    position:relative
    height 32px
    width:32px
    margin:-64px auto 0 auto
    clear:both
    font-size:32px
    .icon-close
      color:#fff
  &.fade-enter-active,&.fade-leave-active
    transition:all 0.5s
  &.fade-enter,&.fade-leave-to
    opacity :0
    background:rgba(7,17,27,0)

</style>

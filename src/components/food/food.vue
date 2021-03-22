<template>
  <transition name='slide' >
    <div class="food-wrap" v-show='visible' >
      <cube-scroll ref ='scroll'>
        <div class="foodheader">
          <span class="callback" @click='hide'>&lt;</span>
          <img :src="food.image" alt="">
        </div>
        <div class="introduce">
          <h3>{{food.name}}</h3>
          <article class="desc">
            <span class="yeshou">月售{{food.sellCount}}</span>
            <span class="haoping">好评率{{food.rating}}%</span>
          </article>
          <article class="other">
            <div class="Price">
              <span class="now">¥24</span>
              <s class="old">¥28</s>
            </div>
            <div class="addDesc">
              <span class="btncart"  v-show="!food.count"  @click="joinCart()">加入购物车</span>
              <span class="btnBar" v-show="food.count >0" ><CartCtrl :food="food"/></span>
            </div>
          </article>
        </div>
        <Spitline />
        <div class="prdcInfo">
          <h3>商品介绍</h3>
          <article>{{food.info}}</article>
        </div>
        <Spitline />
        <div class="ratings">
          <div class="screen">
            <h3>商品评价</h3>
            <div class="ratings-opt">
              <span class="all">全部</span>
              <span class="good">满意</span>
              <span class="bad">不满意</span>
            </div>
            <div class="ratings-opt-content">
              <i></i> 只看评价内容
            </div>
          </div>
          <div class="ratings-content"></div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
// import '' from ''
import popupMixins from 'common/mixins/mixins'
import CartCtrl from '../cartCtrl/cartCtrl'
import Spitline from '../spitLine/spitline'
const EVENT_SHOW = 'show'
export default {
  name: 'food',
  mixins: [popupMixins],
  props: {
    food: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  created() {
    // 创建时刷新
    this.$on(EVENT_SHOW,()=>{
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    })
  },
  methods: {
    joinCart() {
      if (!this.food.count) {
        // 添加设置属性, vue的api: this.$set vue才可以观测到
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    close() {
      this.visible = true
    }
    // 小球动画，
    // onAdd(el) {
    //   this.$refs.shopCart.drop(el)
    // }
  },
  components: {
    CartCtrl,
    Spitline
  }
//  computed: {},
//  mounted: {},
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
// import '' from ''
.food-wrap
  position: fixed
  top:0
  left:0
  width:100%
  height:100%
  background:rgba(255,255,255,1);
  color:#CCC
  &.slide-enter-active,&.slide-leave-active
    transition : all .3s linear
  &.slide-enter,&.slide-leave-to
    transform: translate3d( 100% ,0, 0)
  .foodheader
    position: relative
    width:100%
    height:0
    padding-top:100%
    img
      position :absolute
      top: 0
      left:0
      width:100%
      height:100%
    .callback
      position:absolute
      top: 20px
      left: 20px 
      z-index:99
      font-size:18px
  .introduce
    padding:18px
    h3 
      font-weight: 700;
      font-size :16px
      line-height:16px
      color:rgb(7,17,27)
    .desc span 
      margin-right:12px
      display :inline-block
      font-size:10px
      line-height: 10px
      color:rgb(147,153,159)
    .desc .yeshou
      margin-top:9px
    .other
      margin-top:18px
      position:relative
      span
        display:inline-block
      .now 
        color:rgb(240,20,20)
        font-size:14px
        font-weight: 700 
        line-height:24px
        margin-right :14px
      .old 
        color:rgb(147,153,159)
        font-size:10px
        font-weight: 700 
        line-height:24px
      .addDesc
        position:absolute
        right:0
        bottom:0
        .btncart
          background-color:rgb(0,160,220)
          padding:6px 12px
          border-radius:12px
          line-height :12px
          font-size:10px
          color:rgb(255,255,255)
        
        .btnBar
          font-weight :900
  .prdcInfo
    padding:18px
    h3
      font-weight: 500;
      font-size: 16px;
      line-height: 16px;
      color: #07111b;
    article
      padding-left:8px
      padding-top:6px
      font-size:12px
      color:rgb(77,85,93)
      line-height :24px
      font-weight:200
  .ratings
    .screen
      padding:18px 18px 14px 18px
      h3
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        color: #07111b;
      .ratings-opt
        span 
          display:inline-block
          padding: 8px 12px
          color:rgb(255,255,255)
</style>

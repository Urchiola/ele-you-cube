<template>
  <transition name='slide' @after-leave ='afterleave' >
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
              
              <span class="btnBar"  ><CartCtrl @add="addFood" :food="food"/></span>
              <transition name='fade'><span class="btncart"   @click="addFirst" v-show="!food.count" >加入购物车</span></transition>
            </div>
          </article>
        </div>
        <Spitline />
        <div class="prdcInfo">
          <h3>商品介绍</h3>
          <article>{{food.info}}</article>
        </div>
        <Spitline 
          
         />
        <div class="ratings">
          <div class="screen">
            <h3>商品评价</h3>
            <selectType 
              @select='onSelect'
              :ratings = 'ratings'
              :desc = 'desc'
              :selectType = 'selectType'
              :onlyContent = 'onlyContent'
              @toggle = 'onToggle'
             />
          </div>
          <div class="ratings-content">
            <ul v-show='computedRatings && computedRatings.length'>
              <li class="rating" v-for="(rating,index) in  computedRatings" :key = 'index'>
                <div class="timeUser clearfix">
                  <p class="time fl">{{format(rating.ratetime)}}</p> 
                  <p class='fr'><span class="usrName">{{rating.username}}</span><img class="usrPic" :src="rating.avatar" alt=""><span class=""></span></p>
                </div>
                <div class="content">
                  <i class="zan icon" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}" v-show='rating.text'></i><span>{{rating.text}}</span>
                </div>
              </li>
            </ul>
            <div class="no-rating" v-show="!computedRatings || !computedRatings.length">暂无评价</div>
          </div>
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
import selectType from '../selectType/selectType'
import moment from 'moment' // 时间戳 转换库 moment.js
const EVENT_SHOW = 'show'
const EVENT_LEAVE = 'leave'
const EVENT_ADD = 'add'

const ALL = 2
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
      desc: { all: '全部', positive: '推荐', nagetive: '吐槽' },
      selectType: ALL,
      onlyContent: true
    }
  },
  computed: {
    ratings() {
      return this.food.ratings
    },
    computedRatings() {
      let res = []
      this.food.ratings.forEach((rating) => {
        if (this.onlyContent && !rating.text) {
          return
        }
        if (this.selectType === ALL || this.selectType === rating.rateType) {
          res.push(rating)
        }
      })
      return res
    }
  },
  created() {
    // 创建时刷新
    this.$on(EVENT_SHOW, () => {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    })
  },
  methods: {
    onSelect(type) {
      this.selectType = type
    },
    onToggle() {
      return (this.onlyContent = !this.onlyContent)
    },
    format(time) {
      return moment(time).format('YYYY-MM-DD hh:mm')
    },
    addFirst(event) {
      // 添加设置属性, vue的api: this.$set vue才可以观测到
      this.$set(this.food, 'count', 1)
      this.$emit(EVENT_ADD, event.target)
    },
    // 此方法 专接受 cartctrl 组件中的add 方法，再派发到 good组件
    addFood(target) {
      this.$emit(EVENT_ADD, target)
      console.log(target)
    },
    close() {
      this.visible = true
    },
    afterleave() {
      this.$emit(EVENT_LEAVE)
    }
    // 小球动画，
    // onAdd(el) {
    //   this.$refs.shopCart.drop(el)
    // }
  },
  components: {
    CartCtrl,
    Spitline,
    selectType
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
          position :absolute
          right:0
          bottom:8px
          background-color:rgb(0,160,220)
          z-index: 10
          padding: 0 12px
          box-sizing: border-box;
          border-radius: 12px;
          font-size: 10px;
          color: #fff;
          width: 100px;
          padding: 6px 12px;
          text-align: center;
          &.fade-enter-active,&.fade-leave-active
            transition:all 0.3s
          &.fade-enter,&.fade-leave-to
            opacity :0
        .btnBar
          position :absolute
          right:0
          bottom:0
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
    padding-bottom:56px
    .screen
      padding:18px 18px 14px 18px
      h3
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        color: #07111b;
      .ratings-opt
        padding:24px 0 18px 0
        border-bottom:1px solid rgba(7,17,27,0.1)
        span 
          display:inline-block
          margin-right:8px
          font-size:13px
          border-radius:3px
          padding: 8px 12px
          height :16px
          line-height :16px
          color:rgb(255,255,255)
        span:nth-child(1)
          background-color :rgb(0,160,220)
        span:nth-child(2)
          color :rgb(77,85,92)
          background-color :rgba(0,160,220,0.2)
        span:nth-child(3)
          color :rgb(77,85,92)
          background-color :rgba(77,85,92,0.2)
      .ratings-opt-content
        padding-top:12px
        font-size:12px
        line-height :24px
        i
          font-size:24px
          line-height :24px
        i.check
          color:rgb(0,160,220)
        span
          display: inline-block;
          vertical-align: top;
          margin-left:4px
    .ratings-content
      border-top:1px solid rgba(7,17,27,0.1)
      padding:0 18px
      .rating
        padding:16px 0
        border-bottom:1px solid rgba(7,17,27,0.1)
        .timeUser
          margin-bottom :6px
          font-size:10px 
          .usrPic
            vertical-align :middle
            margin-left:6px
            width:16px
            height :16px
            border-radius :50%
        .content
          .zan
            &.icon-thumb_up
              color:rgb(0,160,220)
          span 
            color:rgb(0,0,0)
            font-size:15px
            vertical-align :top
            margin-left:4px
    .no-rating
      padding:18px 0
</style>

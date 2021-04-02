<template>
  <cube-scroll ref='scroll' :options="scrollOptions">
    <div class='ratings'>
      ratingsss
      <Spitline />
      <div class="screen">
        <h3>商品评价</h3>
        <selectType 
          :ratings = 'ratings'
          :desc = 'desc'
          :selectType = 'selectType'
          :onlyContent = 'onlyContent'
          @select='onSelect'
          @toggle = 'onToggles'
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
</template>

<script>
import { getRatings } from 'api'
import Spitline from '../spitLine/spitline'
import selectType from '../selectType/selectType'
import moment from 'moment' // 时间戳 转换库 moment.js
const EVENT_SHOW ='show'
const ALL = 2
export default {
  name: 'ratings',
  data() {
    return {
      ratings: [],
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      },
      desc: { all: '全部', positive: '满意', nagetive: '不满意' },
      selectType: ALL,
      onlyContent: true
    }
  },
  components: {
    Spitline,
    selectType
  },
  created() {
    console.log(1)
    // 创建时刷新
    this.$on(EVENT_SHOW, () => {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    })
  },
  computed: {
    
    computedRatings() {
      let res = []
      this.ratings.forEach((rating) => {
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
  methods: {
    // tabs 点击切换时调用（父->子）
    fetch() {
      // 没有请求过，则请求，并这只flag 为true
      if (!this.fatched) {
        this.fatched = true
        getRatings().then((ratings) => {
          this.ratings = ratings
        })
      }
    },
    onSelect(type) { 
      this.selectType = type
    },
    onToggles() {
      return (this.onlyContent = !this.onlyContent)
    },
    format(time) {
      return moment(time).format('YYYY-MM-DD hh:mm')
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
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
        margin-left: 6px
        width: 16px
        height: 16px
        border-radius: 50%
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

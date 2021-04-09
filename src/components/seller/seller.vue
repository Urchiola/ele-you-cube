<template>
  <cube-scroll :options="sellerScrollOptions">
    <div class='seller'>
      <div class="band">
        <div class="top clearfix">
          <div class="bandLeft fl">
            <h3 class="name">{{seller.name}}</h3>
            <p class="star"><star :size='36' :score ='4.6'/><span>(661)</span><span>月售{{seller.sellCount}}单</span></p>
          </div>
          <div class="favorite fr" @click="toggleFavorite">
            <i class="icon icon-favorite" :class="{'active':favorite}"></i>
            <p class="text">{{favoriteText}}</p>
          </div>
        </div>
        <div class="down">
          <ul>
            <li class="content">
              <p class="title">起送价</p>
              <p class="text">
                <span class="price">{{seller.minPrice}}</span>元
              </p>
            </li>
            <li class="content">
              <p class="title">商家配送</p>
              <p class="text">
                <span class="price">{{seller.deliveryPrice}}</span>元
              </p>
            </li>
            <li class="content">
              <p class="title">平均配送时间</p>
              <p class="text">
                <span class="price">{{seller.deliveryTime}}</span>分钟
              </p>
            </li>
          </ul>
        </div>
      </div>
      <spitline />
      <div class="activity">
        
        <h3 class="common-title">公告与活动</h3>
        <article class="active-info">{{seller.bulletin}}</article>
        <ul class="active-list">
            <li class="active-item" :key ='index' v-for= '(item,index) in seller.supports' >
              <!-- <span class='icon' :class="classMap[pseller.supports[index].type]" ></span> -->
              <supportIco :size=2 :type="index"></supportIco>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
      </div>
      <spitline />
      <div class="realimg">
        <h3 class="common-title">商家实景</h3>
        <cube-scroll class="pic-wrapper" :options="picScrollOptions">
          <ul class="pic-list">
            <li class="pic-item " :key='index' v-for="(pic,index) in seller.pics" >
              <img :src="pic" width="120" height="90" >
            </li>
          </ul>
        </cube-scroll>
      </div>
      <spitline />
      <div class="infomation">
        <h3 class="common-title">商家信息</h3>
        <ul class="info-list">
          <li class="info-item" v-for="(info,index) in seller.infos" :key ="index">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
import {saveTOLocal,getFromLocal} from 'common/js/storage.js'
import Spitline from '../spitLine/spitline'
import star from '../star/star'
import supportIco from '../support-ico/support-ico'

export default {
  name: 'seller',
  data() {
    return {
      sellerScrollOptions: {
        directionLockThreshold: 0,
        click: false
      },
      picScrollOptions: {
        scrollX: true,
        stopPropagation: true,
        directionLockThreshold: 0
      },
      favorite:  false
    }
  },
  props:{
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    Spitline,
    star,
    supportIco
  },
  created() {
    this.favorite = getFromLocal(2, 'favorite')
  },
  computed: {
    seller() {
      return this.data.seller || {}
    },
    favoriteText() {
      return this.favorite?'已收藏':'收藏'
    }
  },
  methods: {
    toggleFavorite() {
      // localStorage.setItem('test','012')  //原生用法 存和取  
      // localStorage.getItem('test')) // 012
      // localStorage.removeItem('key') //删除对应key以及key中的内容
      // localStorage.clear()// 请谨慎使用,它会清空所有的本地存储数据

      //JSON.stringify(object) // 将对象成json字符串序列
      // JSON.parse(str) // 将json字符串序列 成 对象
      
      // this.seller.id , favorite,false
      saveTOLocal(2, 'favorite', !this.favorite)
      return this.favorite = !this.favorite
    }
  }
//  mounted: {},

}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
.seller
  .common-title
    color:rgb(7,17,27)
    font-size:16px
    line-height :14px
    font-weight :600
  .band
    padding:18px
    .top
      padding-bottom:18px
      border-bottom:1px solid rgba(7,17,27,0.1)
      .bandLeft
        .name
          color:rgb(7,17,27)
          font-size:16px
          line-height :14px
          font-weight :600
        .star
          display:inline-block
          font-size:10px
          color:rgb(77,85,93)
          line-height :18px
          margin-top:8px
          span 
            margin-left:10px
      .favorite
        text-align :center
        width:40px
        .icon
          font-size:24px
          line-height:24px
          color:rgb(77,85,93)
          &.active
            color:rgb(240,20,20)
        .text
          margin-top:4px
          font-size:10px
          line-height :10px
          color:rgb(77,85,93)
    .down
      ul 
        display:flex
        padding:18px 0
        .content
          flex:1
          text-align:center
          border-right:1px solid rgba(7,17,27,0.1)
          &:last-child
            border:none
          .title
            font-size:10px
            color:rgba(147,153,159,0.8)
            line-height:10px
            margin-bottom:8px
          .text
            font-size:10px
            font-weight:200
            color:rgb(7,17,27)
            line-height :24px
            .price
              display:inline-block
              font-size:24px
  .activity
    padding:18px            
    .active-info
      word-wrap: break-word
      padding:8px 12px 16px 12px
      font-size:12px
      font-weight :200
      color:rgb(200,20,20)
      line-height:24px
      white-space:break-spaces
    .active-list
      .active-item
        padding:16px
        border-top:1px solid rgba(7,17,27,0.1)
        .text
          font-size:12px
          font-weight :200
          color: rgb(7,17,27)
          line-height:16px
          vertical-align: top
  .realimg
    padding 18px
    .common-title
      margin-bottom:12px
    .pic-wrapper
        display: flex  // 横向滚动，技巧
        align-items: center
      .pic-list
        .pic-item
          display: inline-block
          margin-right: 6px
          width: 120px
          height: 90px
          &:last-child
            margin: 0
  .infomation
    padding:18px
    .info-list
      margin-top:12px
      padding-bottom:48px
      .info-item
        padding:16px 12px
        font-size:12px
        line-height :32px
        height:32px
        color:rgb(7,17,27)
        border-top:1px solid rgba(7,17,27,0.1)
        text-overflow: ellipsis
        white-space: nowrap
        overflow: hidden
        
</style>

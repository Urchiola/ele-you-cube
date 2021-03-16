<template>
  <transition name='slide' >
    <div class="food-wrap" v-show='visible' >
      <cube-scroll>
       <div class="foodheader">
         <span class="callback">&lt;</span>
         <img :src="food.image" alt="">
       </div>
       <div class="introduce">
         <h3>{{curFood.name}}</h3>
         <article class="desc">
           <span class="yeshou">月售{{curFood.sellCount}}</span>
           <span class="haoping">好评率{{curFood.rating}}%</span>
         </article>
         <article class="other">
           <div class="Price">
             <span class="now">¥24</span>
             <s class="old">¥28</s>
           </div>
           <div class="addDesc">
             <span class="btncart">加入购物车</span>
             <span class="btnBar"></span>
           </div>
         </article>
       </div>
       <div class="goodsratings"></div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
// import '' from ''
import popupMixins from 'common/mixins/mixins'
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
      curFood: this.food
    }
  },
  methods: {
    close() {
      this.visible = true
    }
  }
//  components: {},
//  computed: {},
//  mounted: {},
//  methods: {}
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
</style>

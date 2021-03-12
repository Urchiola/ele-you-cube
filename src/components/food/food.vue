<template>
  <transition name='slide' >
    <div class="food-wrap" v-show='visible' >
      <cube-scroll>
       <div class="foodheader">
         <span class="callback">&lt;</span>
         <img :src="food.image" alt="">
       </div>
       <div class="introduce">
         <h3>商品信息</h3>
         <article class="desc">这是一道好吃的菜</article>
         <article class="other">
           <div class="Price">
             <span>¥24</span>
             <span>¥28</span>
           </div>
           <div class="addDesc">
             <span class="btnAdd">加入购物车</span>
             <span class="btnAdd"></span>
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
  props:{
    food:{
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
      font-size :14px
      line-height:14px
      color:#000
</style>

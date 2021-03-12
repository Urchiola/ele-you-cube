<template>
  <div class='shopCart'>
    <div class="content" @click ="toggleList">
      <div class="content-left">
        <div class="logo-wrap">
          <div class="logo" :class="{'lightHigh': totalCount> 0}">
            <i class="icon-shopping_cart" :class="{'lightHigh': totalCount> 0}"
              ></i>
          </div>
          <div class="num" v-show= 'totalCount > 0'>
            <bubble :num='totalCount'></bubble>
          </div>
        </div>
        <div class="price">￥{{totalPrice}}</div>
        <div class="deliveryPrice">另需配送费￥4元</div>
      </div>
      <div class="content-right">
        <div class="pay " :class="payClass" @click="pay">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="(ball,index) in balls" :key="index">
        <transition
          @before-enter="beforeDrop"
          @enter="dropping"
          @after-enter="afterDrop"
        >
          <div class="ball" v-show =" ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// import { getGoods } from 'api'
import bubble from '../bubble/bubble'
const innerClsHook = 'inner-hook'
const BALL_LEN = 10
function creatBalls() {
  let ret = []
  for (let i = 0; i < BALL_LEN; i++) {
    ret.push({
      show: false
    })
  }
  return ret
}

export default {
  name: 'shopCart',
  props: {
    selectFoods: {
      type: Array,
      deafult() {
        return []
      }
    },
    minPrice: {
      type: Number,
      default: 0
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    fold: {
      type: Boolean,
      default: true
    },
    sticky: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      balls: creatBalls(),
      listFold: this.fold
    }
  },
  computed: {
    // 计算已选择商品总数
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    // 计算选购商品的 总价
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += (food.count * food.price)
      })
      return total
    },
    // 支付按钮 内容
    payDesc() {
      if (this.totalCount === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass() {
      if(!this.totalCount || this.totalPrice< this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  },
  created() {
    // 下落的小球，临时保留（不是响应式的），so 不用写入data 里面
    this.dropBalls = []
  },
  methods: {
    pay(e) {
      if(this.totalPrice<this.minPrice) {
        return
      }
      this.$createDialog({
        title: '支付',
        content: `您共需支付${this.totalPrice}元`
      }).show()
      e.stopPropagation() // 阻止冒泡
    },
    // 展示 购物车列表
    toggleList() {
      if (this.listFold) {
        // 如果购物车没商品,直接返回
        if (!this.totalCount) {
          return
        }
        // 如果有商品，显示并 将状态改为false
        this.listFold = false
        this._showShopCartList()

        // 由于shop-cart-list 出现层级现象, 这里复制一层shop-cart 显示层级在shop-cart-list 之上
        // 这里点击show() 则展示shop-cart-sticky
        this._showShopCartSticky()
      } else {
        this.listFold = true
        this._hideShopCartList()
      }
    },
    // 展示 购物列表
    _showShopCartList() {
      // cubeui：this.$createShopCartList 通过createAPI  把 shop-cart-list.vue 变成一个 API 式调用的组件并调用
      // cubeui：$props Object类型
      //  this.ShopCartListComp: 组件实例；  因为这是单例的所有要做个缓存，避免每次调用都创建
      this.shopCartListComp = this.shopCartListComp || this.$createShopCartList({
        $props: {
          selectFoods: 'selectFoods'
        },
        $events: {
          // shop-cart-list 点击蒙层 派发事件监听
          hide: () => {
            this.listFold = true
            
          },
          leave: () =>{
            // 当首cartlist 隐藏时，
            this._hideShopCartSticky();
          },
          // 监听 EVENT_ADD 小球动画
          add: (el) => {
            this.shopCartStickyComp.drop(el)
          }
        }
      })
      this.shopCartListComp.show()
    },
    // 隐藏 购物列表
    _hideShopCartList() {
      // 重复创建shopCartList
      const list = this.sticky ? this.$parent.list : this.shopCartListComp
      list.hide && list.hide()
    },
    // 展示shopcart副本
    _showShopCartSticky() {
      this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
        $props: {
          selectFoods: 'selectFoods',
          minPrice: 'minPrice',
          deliveryPrice: 'deliveryPrice',
          // shopcartSticky  销毁
          fold: 'listFold', 
          // 重复创建shopCartList：由于sticky 没有shopCartListComp，这里传入给sticky 使用
          list: this.shopCartListComp
        }
      })
      this.shopCartStickyComp.show()
    },
    // 隐藏shopcart副本
    _hideShopCartSticky() {
      this.shopCartStickyComp.hide()
    },
    // el: 添加按钮的 dom元素
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    // vue transition 过度函数
    beforeDrop (el) {
      const ball = this.dropBalls[this.dropBalls.length - 1]
      // 方法返回元素的大小及其相对于视口的位置
      const rect = ball.el.getBoundingClientRect()
      const x = rect.left - 32
      const y = -(window.innerHeight - rect.top - 22)
      el.style.display = ''
      el.style.transfrom = el.style.webkitTransform = `translate3d(0,${y}px,0)`
      const inner = el.getElementsByClassName(innerClsHook)[0]
      // webkitTransform: 为了兼容低版本的 安卓浏览器
      inner.style.display = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
    },
    dropping (el, done) {
      // document.body.offsetHeight: DOM 的 API，可以触发浏览器的重绘
      // 赋值给 this._reflow 只是不会触发 eslint 报错
      this._reflow = document.body.offsetHeight
      el.style.transfrom = el.style.webkitTransform = `translate3d(0,0,0)`
      const inner = el.getElementsByClassName(innerClsHook)[0]
      inner.style.display = inner.style.webkitTransform = `translate3d(0,0,0)`
      // 监听transitionend事件，并结束done
      el.addEventListener('transitionend', done)
    },
    afterDrop (el) {
      // 拿到最新的ball
      const ball = this.dropBalls.shift()
      if (ball) {
        // 回收起来，并 设置状态 
        ball.show = false
        el.style.display = 'none'
      }
    }
    // vue transition 过度函数
  },
  components: {
    bubble
  },
  watch: {
    // 无限创建shoplist, 监听fold
    fold(newVal) {
      this.listFold = newVal
    },
    totalCount(newVal) {
      // 当 shopcartlist 展开 并
      if(!this.listFold && !newVal) {
       this._hideShopCartList()
      }
    }
  },
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@import "~common/stylus/variable"
.shopCart
  height: 100%
  .content
    display :flex
    background:#141D27
    font-size: 1
    color: $color-light-grey
    .content-left
      flex:1
      .logo-wrap
        display :inline-block
        background:#141D27
        position: relative
        border-radius: 50%
        width: 56px
        height:56px
        padding: 6px
        margin: 0 18px
        margin-top:-10px
        margin-right:7px
        box-sizing: border-box
        .logo
          background:rgba(255,255,255,0.4)
          height: 100%
          width: 100%
          border-radius:50%
          line-height :44px
          font-size :24px
          text-align:center
          &.lightHigh
            background:#0394D8
            .icon-shopping_cart
              color: $color-light-grey
              &.lightHigh
                color:#fff
        .num
          position: absolute;
          right:0
          top:0
      .price
        display: inline-block
        color:rgb(255,255,255)
        line-height :24px
        font-size:14px
        font-weight:900
        border-right:1px solid rgba(255,255,255,.4)
        padding-right:12px
        margin-right:8px
      .deliveryPrice
        display :inline-block
        font-size:12px
        color:rgba(255,255,255,0.6)
        line-height:48px
    .content-right
      flex: 0 0 105px
      width: 105px
      .pay
        width :100%
        height:100%
        background :#2B333B
        text-align:center
        line-height: 48px
        font-size :$fontsize-small
        font-weight:700
        &.enough
          color:rgb(255,255,255)
          background: $color-green
        // &.enough:active   :active 移动端显示有问题
        //   background: blue
        &.notEnough
          color:$color-light-grey
  .ball-container
    .ball
      position: fixed
      left: 32px
      bottom: 22px
      z-index: 200
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        width: 16px
        height: 16px
        border-radius: 50%
        background: $color-blue
        transition: all 0.4s linear
</style>

<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <!-- left -->
      <!--
        data: 数据源，可选, Array
        side:  是否是侧边样式 ,Boolean
        current: 当前导航 active 项的"key"值, String/Number
        speed: 点击导航切换到指定位置的速度,Number
        options: better-scroll 配置项
       -->
      <cube-scroll-nav
        :side="true"
        :data="goods"
        :options="scrollOptions"
        v-if="goods.length" >
        <!-- 自定义结构   cube-scroll-nav-bar -->
        <!-- 自定义导航结构用：cube-scroll-nav-bar  -->
        <!-- template: 方便引入数据使用，不做渲染
                  slot="bar"
                  slot-scope="props" 传递数据
         -->
        <!--  direction:排列方向：默认横向
              labels: 所有面板的 label 值集合
             txts: 所有面板的 title 值集合 ,此处用到了自定方法计算
             current: 当前导航 active 项的 key 值-->
          <!-- vuejs:
            slot: 插槽名称
            slot-scope:子组件 提供个父组件 插槽 参数
          -->
        <template slot="bar" slot-scope="props">
          <cube-scroll-nav-bar
            direction="vertical"
            :labels="props.labels"
            :txts="barTxts"
            :current= "props.current" >
            <template slot-scope="props">
              <div class="barsTextWrap" >
                <div class="barsText">
                  <supportIco
                  v-if ="props.txt.type>=1"
                  :size=3
                  :type="props.txt.type"
                  >
                  </supportIco>
                  <span>{{props.txt.name}}</span>
                </div>
                <div class="num" v-if="props.txt.count">
                  <bubble :num='props.txt.count'></bubble>
                </div>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <!-- right -->
        <cube-scroll-nav-panel
          v-for="item in goods"
          :key="item.name"
          :label="item.name"
          :title="item.name">
          <ul>
            <li v-for="(food,index) in item.foods" :key = index @click="selectFood(food)">
              <div class="foodlist-Wrap">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <div class="name">{{food.name}}</div>
                  <p class="des">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥28{{food.oldPrice}}</span>
                  </div>
                  <div class="cart-control-wrapper">
                    <cartCtrl @add="onAdd" :food="food"></cartCtrl>
                  </div>
                </div>
                <p class="desc"></p>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
     </div>
     <div class="shopCart-wrap">
       <shopCart
       ref="shopCart"
       :min-price="seller.minPrice"
       :delivery-price="seller.deliveryPrice"
       :select-foods = 'selectFoods'></shopCart>
     </div>
  </div>
</template>

<script>
//  import '' from ''
import { getGoods } from 'api'
import supportIco from '../support-ico/support-ico.vue'
import bubble from '../bubble/bubble'
import cartCtrl from '../cartCtrl/cartCtrl'
import shopCart from '../shop-cart/shopCart'
export default {
  name: 'goods',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      goods: [],
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      },
      selectedFood: {}
    }
  },
  methods: {
    // tabs 点击切换时调用（父->子）
    fetch() {
      // 没有请求过，则请求，并这只flag 为true
      if (!this.fatched) {
        this.fatched = true
        getGoods().then((goods) => {
          this.goods = goods
        })
      }
    },
    changeHandler() {
      // console.log('changed to:', label)
    },
    // 驱动 点击添加按钮 小球下落动
    onAdd(el) {
      this.$refs.shopCart.drop(el)
    },
    selectFood(food) {
      // 响应式food,so food赋值给this.selectedFood
      this.selectedFood = food
      this._showSelectFood() 
    },
    _showSelectFood() {
      this.foodComp = this.foodComp || this.$createFood({
        $props: {
          food: 'selectedFood'
        }
      })
      this.foodComp.show()
    }
  },
  computed: {
    // tabs 传入data ，已包含请求seller
    seller() {
      return this.data.seller
    },
    // 自定义左侧menu 的title。 因为不止需要name,还需要type,count的数据
    barTxts() {
      let ret = []
      this.goods.forEach((good) => {
        const { type, name, foods } = good
        let count = 0
        foods.forEach((food) => {
          count += food.count || 0
        })
        ret.push({
          type,
          name,
          count
        })
      })
      return ret
    },
    //  计算 cartCtrl 添加 的商品
    selectFoods() {
      let res = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            res.push(food)
          }
        })
      })
      return res
    },
    // 计算 不同分类下的 选购总数
    totalClassCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    }
  },
  components: {
    supportIco,
    bubble,
    cartCtrl,
    shopCart
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@import "~common/stylus/mixin"
@import "~common/stylus/variable"
.goods
  position: relative
  text-align: left
  height: 100%
  .scroll-nav-wrapper
    position: absolute
    width: 100%
    top: 0
    left: 0
    bottom: 48px
    >>> .cube-scroll-nav-bar
          width: 82px
          word-break:normal
          white-space: normal
          overflow: hidden
    >>> .cube-scroll-nav-bar-item
        padding: 0 10px
        height: 56px
        line-height: 14px
        background: #F3F5F7
        font-size: 12px
        .barsTextWrap
          height :100%
          width:100%
          display:flex
          align-items: center // display:flex 搭配使用水平居中
          border-btm-1px(rgba(7,17,27,0.1))
          .barsText
            flex:1
            color:rgb(31,40,49)
            .support-ico
              margin-right:4px
          .num
            position:absolute
            right:-6px
            top:2px
    >>> .cube-scroll-nav-bar-item.cube-scroll-nav-bar-item_active
          background: #fff
          position :relative
          z-index :9
          margin-top:-1px
          .barsTextWrap
            border-none1px()
            span
              font-weight:600
    //右侧列表
    >>> .cube-sticky-content
      .cube-scroll-nav-panel-title
        height:26px
        line-height:26px
        background:#F3F5F7
        padding-left:14px
        border-left:2px solid #D9DDE1
        color:#93999F
    >>> .cube-scroll-nav-panels ul li
          padding:18px
          padding-bottom:0
    >>> .cube-scroll-nav-panels .foodlist-Wrap
          display:flex
          width :100%
          height:100%
          padding-bottom:18px
          border-btm-1px(rgba(7,17,27,0.1))
          .icon
            flex: 0 0 57px
            margin-right:10px
        .content
            position:relative
            flex:1
            .name
              font-size:14px
              color:rgb(7,17,27)
              line-height:14px
              margin: 2px 0 8px
            .des,.extra
              font-size:10px
              color:rgb(147,153,159)
            .extra
              margin-top:8px
              margin-bottom :8px
              .count
                margin-right:12px
            .price
              .now,.old
                font-weight :700
                line-height 24px
              .now
                color:#F01414
                font-size: 14px
                margin-right:8px
              .old
                font-size:10px
                color:#93999F
                text-decoration-line: line-through
          .cart-control-wrapper
            position:absolute
            right:-12px
            bottom:-12px
  .shopCart-wrap
    position :absolute
    z-index:10
    left:0;
    bottom :0
    width:100%
    height:48px
</style>

<template>
<transition name="fade">
  <cube-popup
     type="shop-cart-list"
    :mask="true"
    :mask-closable="true"
    @mask-click="maskClick"
    position="bottom"
    v-show="visible"
  >
    <transition
      name = "move"
      @after-leave ="onLeave"
    >
      <div v-show="visible">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span @click="empty" class="emty">清空</span>
        </div>
        <!--
          cubeui: 滚动列表，提供了优质的原生滚动体验，便捷的配置项和事件，是一个基于better-scroll进行封装的组件
        -->
        <cube-scroll class="list-content" ref ="listContent">
          <ul>
            <li
              class="food"
              v-for="food in selectFoods"
              :key="food.name">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.count * food.price}}</span>
              </div>
              <div class="cartCtrl-wrap">
                <cartCtrl :food="food" @add="onAdd"></cartCtrl>
              </div>
            </li>
          </ul>
        </cube-scroll>
      </div>
    </transition>
  </cube-popup>
</transition>
</template>

<script>
// 此组件使用cube-ui Popup 弹层， 需register.js 注册
import cartCtrl from 'components/cartCtrl/cartCtrl'
import popupMixins from 'common/mixins/mixins'

const EVENT_LEAVE = 'leave'
const EVENT_ADD = 'add'
const EVENT_SHOW = 'show'
export default {
  name: 'shop-cart-list',
  mixins: [popupMixins],
  props: {
    selectFoods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  created() {
    this.$on(EVENT_SHOW, () => {
      // 刷新lisfcontent 信息
      this.$nextTick(() => {
        this.$refs.listContent.refresh()
      })
    })
  },
  methods: {
    maskClick() {
      this.hide()
    },
    onLeave() {
      // 配合@after-leave,派发一个事件
      this.$emit(EVENT_LEAVE)
    },
    onAdd(target) {
      this.$emit(EVENT_ADD, target)
    },
    empty() {
      this.$createDialog({
        type: 'confirm',
        content: '清空购物车吗?',
        $events: {
          confirm: () => {
            this.selectFoods.forEach((food) => {
              food.count = 0 
            })
            this.hide()
          }
        }
      }).show()
    }
  },
  
  components: {
    cartCtrl
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@import "~common/stylus/variable"
.cube-shop-cart-list
  bottom:48px
  &.fade-enter, &.fade-leave-active
    opacity: 0
  &.fade-enter-active, &.fade-leave-active
    transition: all .3s ease-in-out
  .move-enter, .move-leave-active
      transform: translate3d(0, 100%, 0)
  .move-enter-active, .move-leave-active
    transition: all .3s ease-in-out
  .list-header
    height:40px
    line-height :40px
    background:#f3f5f7
    border-bottom:1px solid #DBDEE1
    .title,.emty
      padding:0 18px
    .title
      float :left
      font-size:14px
    .emty
      float :right
      font-size:12px
      color:rgb(0,160,220)
  .list-content
    padding:0 18px
    max-height: 217px
    overflow: hidden
    background :#fff
    .food
      position: relative
      padding: 12px 0
      box-sizing: border-box
      .name
        line-height: 24px
        font-size: $fontsize-medium
        color: $color-dark-grey
      .price
        position: absolute
        right: 90px
        bottom: 12px
        line-height: 24px
        font-weight: 700
        font-size: $fontsize-medium
        color: $color-red
      .cartCtrl-wrap
        position: absolute
        right: 0
        bottom: 6px
</style>

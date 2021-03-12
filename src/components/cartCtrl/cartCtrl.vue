<template>
  <div class='cartCtrl'>
      <transition name="move">
        <div class="cart-reduce" v-show="food.count>0" @click.stop="reduce" >
          <span class='inner icon-remove_circle_outline'></span>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add  icon-add_circle" @click.stop="add"></div>
  </div>
</template>

<script>
const EVENT_ADD = 'add'
export default {
  name: 'cartCtrl',
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {}
  },
  methods: {
    add(event) {
      if (!this.food.count) {
        // 添加设置属性, vue的api: this.$set vue才可以观测到
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      // 为小球动画，派发一个事件 event:点击作为参数派发
      this.$emit(EVENT_ADD, event.target)
    },
    reduce() {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@import "~common/stylus/variable"
.cartCtrl
  display: flex
  align-items: center
  .cart-reduce
      display: inline-block
      padding: 6px
      opacity: 1
      .inner
        display: inline-block
        line-height: 24px
        font-size: $fontsize-large-xxx
        color: $color-blue
        transition: all  linear 0.4s
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all  linear 0.4s
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
  .cart-count
      width: 12px
      line-height: 24px
      text-align: center
      font-size: $fontsize-small-s
      color: $color-grey
    .cart-add
      display: inline-block
      padding: 8px
      line-height: 24px
      font-size: $fontsize-large-xxx
      color: $color-blue
</style>

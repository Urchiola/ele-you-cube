<template>
    <span class='support-ico' :class="iconCls"></span>
</template>

<script>
export default {
  name: 'support-ico',
  data() {
    return {
      // this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  props: {
    size: {
      type: Number
    },
    type: {
      type: Number
    }
  },
  computed: {
    iconCls() {
      return `icon-${this.size} ${this.classMap[this.type]}`
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
  //   components: {},
  //   methods: {},
  //   computed: {},
  //   mounted: {},

}

</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  .support-ico
    display :inline-block
    background-repeat :no-repeat
    color:#fff
  .icon-1
    width: 12px
    height: 12px
    margin-right: 2px
    background-size:12px 12px
    background-repeat :no-repeat
    &.decrease
      bg-image('decrease_1')
    &.discount
      bg-image('discount_1')
    &.guarantee
      bg-image('guarantee_1')
    &.invoice
      bg-image('invoice_1')
    &.special
      bg-image('special_1')
  .icon-2
    width: 16px
    height: 16px
    margin-right: 2px
    background-size:16px 16px
    background-repeat :no-repeat
    &.decrease
      bg-image('decrease_2')
    &.discount
      bg-image('discount_2')
    &.guarantee
      bg-image('guarantee_2')
    &.invoice
      bg-image('invoice_2')
    &.special
      bg-image('special_2')
  .icon-3
    width: 20px
    height: 20px
    margin-right: 2px
    background-size:20px 20px
    background-repeat :no-repeat
    &.decrease
      bg-image('decrease_3')
    &.discount
      bg-image('discount_3')
    &.guarantee
      bg-image('guarantee_3')
    &.invoice
      bg-image('invoice_3')
    &.special
      bg-image('special_3')
</style>

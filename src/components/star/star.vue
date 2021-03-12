<!--  -->
<template>
<div class="star" :class="starType">
  <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
</div>
</template>

<script>
const LENGTH = 5 // 星星数量5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  data() {
    return {}
  },
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size
    },
    itemClasses() {
      // Math.floo : 返回小于等于x的最大整数:
      let result = []
      // math.floor(3.4 * 2)/2 = 4,math.floor(3.5 * 2)/2 = 3.5,
      let score = Math.floor(this.score * 2) / 2
      // 小数部分（取模）：控制是否有半星,
      let hasDecimal = score % 1 !== 0
      // 整数部分，多少个全星
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }

  //  components: {},

  //  computed: {},

  //  mounted: {},

  //  methods: {}
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"
.star
  font-size:0
  .star-item
    display:inline-block
    background-repeat:no-repeat
    &:last-child
      margin-right:0
&.star-48
  .star-item
    width:20p
    height:20px
    margin-right :22px
    background-size:20px 20px //三种状态
    &.on
      bg-image('star48_on')
    &.half
      bg-image('star48_half')
    &.off
      bg-image('star48_off')
&.star-36
  .star-item
    width:15px
    height:15px
    margin-right :6px
    background-size:15px 15px //三种状态
    &.on
      bg-image('star36_on')
    &.half
      bg-image('star36_half')
    &.off
      bg-image('star36_off')
&.star-24
  .star-item
    width:10px
    height:10px
    margin-right :3px
    background-size:10px 10px //三种状态
    &.on
      bg-image('star24_on')
    &.half
      bg-image('star24_half')
    &.off
      bg-image('star24_off')
</style>

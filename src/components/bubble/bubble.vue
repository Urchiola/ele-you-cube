<template>
  <div class='bubble'>{{num}}</div>
</template>

<script>
// import { getGoods } from 'api'
export default {
  name: '',
  props: {
    num: {
      type: Number
    }
  }
}

</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
//  @import ''
  .bubble
    display: inline-block
    padding: 0 4px
    height:16px
    line-height: 16px
    text-align: center
    border-radius: 16px
    font-weight: 700
    font-size:9px
    color:#fff
    background: linear-gradient(to right, orange, red)
</style>

<template>
 <div class='title-line border-1px'>
    <span class="line"></span>
    <span class="text">{{titleName}}</span>
    <span class="line"></span>
 </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    titleName: String
  }
}

</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/mixin.styl';
.title-line
    width:100%
    display: flex
    .line
        position:relative
        left:0
        top:-6px
        flex:1
        border-btp-1px(rgba(255,255,255,0.2))
    .text
        font-size: 14px
        padding:0 12px
        font-weight:700
        color:rgb(255,255,255)
        line-height :14px
</style>

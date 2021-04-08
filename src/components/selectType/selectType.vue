<template>
  <div class='selectType-wrap'>
    <div class="selecttype">
      <span @click='select(2)' :class="{'active':selectType===2}" class="block s1">{{desc.all}} <span class="count">{{ratings.length}}</span></span>
      <span @click='select(0)' :class="{'active':selectType===0}" class="block s2">{{desc.positive}} <span class="count">{{positives.length}}</span></span>
      <span @click='select(1)' :class="{'active':selectType===1}" class="block s3">{{desc.nagetive}} <span class="count">{{nagetives.length}}</span></span>
    </div>
    <div class="toggleContent" @click.prevent= 'toggle'>
      <i class="icon icon-check_circle " :class="{'check':onlyContent }"></i><span class="toggleSpan">只看内容的评价</span>
    </div>
  </div>
</template>

<script>
// import '' from ''
const ALL = 2
const positive = 0
const nagetive = 1

const EVENT_SELECT = 'select'
const EVENT_TOGGLE = 'toggle'
export default {
  name: 'selectType',
  data() {
    return {
    }
  },
  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          nagetive: '不满意'
        }
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === positive
      })
    },
    nagetives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === nagetive
      })
    }
  },
  methods: {
    select(type) {
      return this.$emit(EVENT_SELECT, type)
    },
    toggle() {
      return this.$emit(EVENT_TOGGLE)
    }
  }
//  mounted: {},
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
// import '' from ''
.selectType-wrap
  padding:0 18px
  .selecttype
    border-bottom:1px solid rgba(77,85,93,0.1)
    padding-bottom:18px
    padding-top:18px
    .block
      display :inline-block
      padding:8px 12px
      color:rgb(77,85,93)
      background-color:rgba(0,160,220,0.2)
      margin-right:8px
      border-radius:2px
      font-size:14px
      &.s2
        background-color:rgba(0,160,220,0.2)
      &.s3
        background-color:rgba(77,85,93,0.2)
      &.active
        color:rgb(255,255,255)
        background-color:rgb(0,160,220)
  .toggleContent
    font-size:24px
    line-height :48px
    .icon-check_circle.check
      color:rgb(0,160,220)
    .toggleSpan
      display :inline-block
      font-size:12px
      color:rgb(147,153,159)
      vertical-align :top
      line-height :48px
      
</style>

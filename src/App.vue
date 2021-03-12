<template>
  <div id="app" @touchmove.prevent>
    <Vheader :pseller="seller" />
    <div class="tab-wrap">
      <tabs :tabs ="tabs" :innitialIndex = 0 > </tabs>
    </div>
  </div>
</template>

<script>
import Vheader from './components/v-header/v-header.vue'
import tabs from './components/tabs/tabs'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'
import { getSellers } from 'api'

export default {
  name: 'app',
  data() {
    return {
      seller: {},
      goods: {},
      ratings: {}
    }
  },
  created() {
    this._getSeller()
  },
  methods: {
    _getSeller() {
      // vue.config.js -> 已定义好请求接口
      // api 下重新封装 各个请求字段
      getSellers().then((seller) => {
        this.seller = seller
      })
    }
  },
  components: {
    Vheader,
    tabs
  },
  computed: {
    // tabBar 的封装
    tabs() {
      return [
        { label: '商品', component: goods, data: { seller: this.seller } },
        { label: '评价', component: ratings, data: { seller: this.seller } },
        { label: '商家', component: seller, data: { seller: this.seller } }
      ]
    }
  }
}
</script>
<style lang="stylus">
#app
  .tab-wrap
    position: fixed
    top: 136px
    left 0
    right: 0
    bottom: 0
</style>

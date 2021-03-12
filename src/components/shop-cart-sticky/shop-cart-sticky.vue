<template>
  <div class="shop-cart-sticky" v-show= "visible">
      <shopCart
        ref="shopCart"
        :selectFoods = "selectFoods"
        :minPrice = "minPrice"
        :deliveryPrice = "deliveryPrice"
        :fold = "fold"
        :sticky = true
      ></shopCart>
  </div>
</template>

<script>
import shopCart from '../shop-cart/shopCart'
import popupMixins from 'common/mixins/mixins'

export default {
  name: 'shop-cart-sticky',
  mixins: [popupMixins],
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
    list: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    drop(el) {
      this.$refs.shopCart.drop(el)
    }
  },
  components: {
    shopCart
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
.shop-cart-sticky
    position :absolute
    bottom:0
    left:0
    z-index:120
    width:100%
    height:48px
</style>

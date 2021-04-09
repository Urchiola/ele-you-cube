import { get } from './helpers'

// 定义多个接口， 方便直接引入使用
const getSellers = get('/api/sellers')
const getGoods = get('/api/goods')
const getRatings = get('/api/ratings')

export {
  getSellers,
  getGoods,
  getRatings
}

import { combineSlices } from 'RedVue'
import { counter } from './features/counter'
import { cart } from './features/cart'
import { logger } from './features/logger'

export default combineSlices({
  cart: cart.register,
  counter: counter.register,
  logger: logger.register
})

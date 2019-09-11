import { combineSlices } from 'RedVue'
import { counter } from './features/counter'
import { cart } from './features/cart'
import { logger } from './features/logger'

export default combineSlices({
  cart: cart.slice.reducer,
  counter: counter.slice.reducer,
  logger: logger.slice.reducer
})

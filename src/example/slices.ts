import { combineSlices } from '../RedVue'
import { counter } from './features/counter'
import { cart } from './features/cart'

export default combineSlices({
  cart: cart.slice.reducer,
  counter: counter.slice.reducer
})

import {combineSlices} from '../RedVue';
import {cart} from './features/cart'

export default combineSlices({
  cart: cart.slice.reducer
})

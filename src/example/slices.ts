import RedVue from '../RedVue';
import {cart} from './features/cart'

export default RedVue.combineSlices({
  cart: cart.slice.reducer
})

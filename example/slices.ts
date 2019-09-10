import RedVue from '../RedVue';
import cart from './features/cart'
import products from './features/products'

const slices = RedVue.combineSlices({
  cart: cart.slice.reducer,
  products: products.slice.reducer
})

export type rootState = ReturnType<typeof slices>
export default slices

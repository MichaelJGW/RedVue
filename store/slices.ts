import RedVue from './RedVue';
import cart from './features/cart'

const slices = RedVue.combineSlices({
  cart: cart.slice.reducer
})

export type rootState = ReturnType<typeof slices>
export default slices

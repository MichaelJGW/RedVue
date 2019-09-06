import store from './store/store'
import {store as cart} from './store/features/cart'

cart.effects.someAsyncAction(store.dispatch, 20)
store.subscribe(() => {
  const state = store.getState();
  console.log(state)
  console.log(cart.selectors.double(state))
  console.log(cart.selectors.half(state))
})

cart.effects.someAsyncAction(store.dispatch, 50000)

setTimeout(() => {
  cart.actions.addCounter(2)
  store.dispatch(cart.actions.addCounter(3))
})

setTimeout(() => {
  store.dispatch(cart.actions.addCounter(20))
}, 1000)

setTimeout(() => {
  store.dispatch(cart.actions.addCounter(1))
}, 3000)
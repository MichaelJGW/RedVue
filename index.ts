import store from './store/store'
import {store as cart} from './store/features/cart'

cart.action.someAsyncAction(20)
store.subscribe(() => {
  const state = store.getState();
  console.log(state.cart.counter, state.cart.double, state.cart.half)
})

cart.action.someAsyncAction(50000)

setTimeout(() => {
  cart.commit.addCounter(3)
})

setTimeout(() => {
  cart.commit.addCounter(20)
}, 1000)

setTimeout(() => {
  cart.commit.addCounter(1)
}, 3000)

for (let index = 0; index < 1000000; index++) {
  cart.commit.addCounter(1);
}
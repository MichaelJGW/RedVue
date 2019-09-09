import {store, RootState} from './store/store'
import cart from './store/features/cart'

// cart.action.someAsyncAction(20)
store.subscribe(() => {
  const state = store.getState() as RootState;
  console.log(state)
  console.log(state.cart.counter, state.cart.double, state.cart.half)
})

// cart.action.someAsyncAction(50000)

setTimeout(() => {
  cart.commit.addCounter(3)
})

setTimeout(() => {
  cart.commit.addCounter(20)
}, 1000)

setTimeout(() => {
  cart.commit.addCounter(1)
}, 3000)

// Speed Test
let speedTestAmount = 10000;
speedTestAmount = 0;
console.time()
for (let index = 0; index < speedTestAmount; index++) {
  cart.commit.addCounter(1);
}
console.timeEnd()
console.log(`for ${speedTestAmount} tasks fired`)
import store from './store/store'
import {action, commit} from './store/features/cart'

action.someAsyncAction(20)
store.subscribe(() => {
  const state = store.getState();
  console.log(state.cart.counter, state.cart.double, state.cart.half)
})

action.someAsyncAction(50000)

setTimeout(() => {
  commit.addCounter(3)
})

setTimeout(() => {
  commit.addCounter(20)
}, 1000)

setTimeout(() => {
  commit.addCounter(1)
}, 3000)

// Speed Test
const speedTestAmount = 10000;
console.time()
for (let index = 0; index < speedTestAmount; index++) {
  commit.addCounter(1);
}
console.timeEnd()
console.log(`for ${speedTestAmount} tasks fired`)
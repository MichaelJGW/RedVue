import {store, rootState} from './store'
import {cart} from './features/cart'


const unsubscribe = store.subscribe(() => {
  const state = store.getState() as rootState
  console.log(state.cart.counter, state.cart.double, state.cart.half)
})

cart.action.someAsyncAction(50000)
cart.commit.addCounter(3)
cart.commit.addCounter(20)
cart.commit.addCounter(1)

// Speed Test
setTimeout (() => {
  unsubscribe()
  const speedTestAmount = 10000;
  const timerName = `for ${speedTestAmount} tasks to fire`
  console.time(timerName)
  const startTime = new Date()
  for (let index = 0; index < speedTestAmount; index++) {
    cart.commit.addCounter(1);
  }
  console.timeEnd(timerName)
  console.log(`about ${(new Date().getTime() - startTime.getTime()) / speedTestAmount}ms for each commit`)
}, 1000)

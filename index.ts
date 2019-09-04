import store from './store/store'
import {actions, computed, effects} from './store/features/cart'

store.subscribe(() => {
  const state = store.getState();
  console.log(state)
  console.log(computed.double(state))
  console.log(computed.half(state))
})

effects.someAsyncAction(store.dispatch, 50000)

setTimeout(() => {
  store.dispatch(actions.addCounter(3))
})

setTimeout(() => {
  store.dispatch(actions.addCounter(20))
}, 1000)

setTimeout(() => {
  store.dispatch(actions.addCounter(1))
}, 3000)
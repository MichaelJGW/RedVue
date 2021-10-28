import { logger } from './features/logger'
import { store } from './store'
import { cart } from './features/cart'

let state = {} as any
const unsubscribe = store.subscribe(() => {
    state = store.getState()
    console.log(state.counter.count, state.cart.counter, state.cart.double, state.cart.half)
})

cart.action.someAsyncAction(50000)
cart.commit.addCounter(3)
cart.commit.addCounter(20)
cart.commit.addCounter(1)

// Turn off Logger for Speed Testing
logger.commit.stop()

// Speed Test
setTimeout(() => {
    unsubscribe()
    const testAmount = 10000;
    const startTime = new Date()
    for (let index = 0; index < testAmount; index++) {
        cart.commit.addCounter(1);
    }
    const deltaTime = new Date().getTime() - startTime.getTime()
    console.log(`time elapsed ${deltaTime}ms for ${testAmount} commits. About ${deltaTime / testAmount}ms for each commit.`)
    console.log(state)
    console.log('middleware Log', JSON.stringify(state.logger.logs.map(log => log.action)))
}, 1000)


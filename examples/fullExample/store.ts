import {initStore} from '../../src/RedVue'
import middleware from './middleware'

// Register
import './features/logger'
import './features/cart'
import './features/counter'

export const store = initStore({ middleware, devTools: false })
import {configureStore} from '../RedVue'
import slices from './slices'
import middleware from './middleware'

export const store = configureStore({ slices, middleware, devTools: false })
export type rootState = ReturnType<typeof slices>
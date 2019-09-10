import {configureStore} from '../RedVue'
import slices from './slices'

export const store = configureStore({ slices })
export type rootState = ReturnType<typeof slices>
import RedVue from '../RedVue'
import slices from './slices'

export const store = RedVue.configureStore({ slices })
export type rootState = ReturnType<typeof slices>
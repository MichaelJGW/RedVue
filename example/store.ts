import RedVue from '../RedVue'
import slices, { rootState } from './slices'

export const store = RedVue.configureStore({ slices })

export type rootState = rootState
export default store
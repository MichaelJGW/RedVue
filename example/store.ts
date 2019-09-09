import RedVue from '../RedVue'
import slices, { rootState } from './slices'

export const store = RedVue.configureStore({
  reducer: slices
})

export type rootState = rootState
export default store

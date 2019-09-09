import {configureStore} from './reduex'
import rootReducer, { RootState } from './rootReducer'

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = RootState
export default store

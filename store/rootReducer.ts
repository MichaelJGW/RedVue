import { combineReducers } from 'redux-starter-kit'
import {store} from './features/cart'

const rootReducer = combineReducers({
  cart: store.slice.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

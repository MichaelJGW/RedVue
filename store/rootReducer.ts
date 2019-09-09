import { combineReducers } from 'redux-starter-kit'
import {slice as cart} from './features/cart'

const rootReducer = combineReducers({
  cart: cart.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

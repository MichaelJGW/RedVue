import { combineReducers } from 'redux-starter-kit'
import {slice as Cart} from './features/cart'

const rootReducer = combineReducers({
  cart: Cart.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

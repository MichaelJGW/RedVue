import { combineReducers } from 'redux-starter-kit'
import cart from './features/cart'

const rootReducer = combineReducers({
  cart: cart.slice.reducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer

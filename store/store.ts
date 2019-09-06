import { configureStore, ActionCreator, Action } from 'redux-starter-kit'
import { ThunkAction } from 'redux-thunk'
import {registerStore} from './reduex'
import rootReducer, { RootState } from './rootReducer'

const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch

export type AppThunk = ActionCreator<ThunkAction<void, RootState, null, Action<string>>>
registerStore(store)
export default store

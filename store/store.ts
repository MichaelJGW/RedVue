import { configureStore, ActionCreator, Action } from 'redux-starter-kit'
// import { ThunkAction } from 'redux-thunk'

import rootReducer, { RootState } from './rootReducer'

const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch

// export type AppThunk = ActionCreator<ThunkAction<void, RootState, null, Action<string>>>

export default store

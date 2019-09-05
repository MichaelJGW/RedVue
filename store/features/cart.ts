import { createSelector } from 'redux-starter-kit'
import { createSlice, IActionPayload } from '../reduex'

type IState = typeof initialState
type ISelectors = typeof selectors
type IReducers = typeof reducers
type IEffects = typeof effects

interface Anything {
  [key: string]: any;
}

const slice = 'cart'

const initialState = {
  counter: 0
}
const selectors = {
  double: createSelector( ['cart.counter'], (counter:number) => counter * 2),
  half: createSelector( ['cart.counter'], (counter:number) => counter / 2 )
}
    const reducers = {
      addCounter(state:IState, payload:IActionPayload<number>):void {
        state.counter += payload.payload;
      }
    }
const effects = {
  someAsyncAction (dispatch, payload:number):void {
    dispatch(store.actions.addCounter())
    setTimeout(() => dispatch(store.actions.addCounter(payload)), 2000)
  }
}

export const store = createSlice <IState, ISelectors, IReducers, IEffects> ({slice, initialState, selectors, reducers, effects})
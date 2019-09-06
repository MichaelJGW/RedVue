import { createSlice, IActionPayload, createSelector } from '../reduex'

type IState = typeof initialState

const slice = 'cart'

const initialState = {
  counter: 0
}
export const selectors = {
  double: createSelector(['cart.counter'], (counter:number) => counter * 2),
  half: createSelector(['cart.counter'], (counter:number) => counter / 2 )
}
const reducers = {
  addCounter(state: IState, payload:IActionPayload<number>):void {
    state.counter += payload.payload;
  }
}
export const effects = {
  someAsyncAction (dispatch, payload:number):void {
    dispatch(store.actions.addCounter(3))
    setTimeout(() => dispatch(store.actions.addCounter(payload)), 2000)
  }
}

export const store = createSlice <IState, typeof selectors, typeof reducers, typeof effects> ({slice, initialState, selectors, reducers, effects})
export const {actions} = store
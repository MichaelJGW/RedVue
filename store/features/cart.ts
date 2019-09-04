import { createSlice, createSelector } from 'redux-starter-kit'
import { ISlice, IEffect, IReducer, IAction } from '../IStore'

interface IState {
  counter: number
}

interface IComputed {
  double (state:any): number,
  half (state:any): number
}

interface IReducers {
  addCounter: IReducer<IState, number>
}

interface IActions {
  addCounter: IAction<number>
}

interface IEffects {
  someAsyncAction: IEffect<number>
}
const store:ISlice <IState, IComputed, IReducers, IEffects> =  {
  slice: 'cart',
  initialState: {
    counter: 0
  },
  computed: {
    double: createSelector( ['cart.counter'], (counter:number) => counter * 2),
    half: createSelector( ['cart.counter'], (counter:number) => counter / 2 )
  },
  reducers: {
    addCounter(state, payload) {
      state.counter += payload.payload;
    }
  },
  effects: {
    someAsyncAction (dispatch, someValue) {
      setTimeout(() => dispatch(actions.addCounter(someValue)), 2000)
    }
  }
}

export const slice = createSlice({slice: store.slice, initialState: store.initialState, reducers: <any> store.reducers})
export const computed = store.computed as IComputed
export const actions = slice.actions as any as IActions // Fix me
export const effects = store.effects as IEffects
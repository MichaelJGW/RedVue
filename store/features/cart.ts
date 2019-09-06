import { createSlice, IActionPayload, createSelector } from '../reduex'

type IState = typeof state

const name = 'cart'

const state = {
  counter: 0
}
const getters = {
  double: (state: IState):number => state.counter * 2,
  half: (state: IState):number => state.counter / 2
}
const mutations = {
  addCounter(state: IState, payload:IActionPayload<number>):void {
    state.counter += payload.payload;
  }
}
export const actions = {
  someAsyncAction (payload:number):void {
    commit.addCounter(3)
    setTimeout(() => commit.addCounter(payload), 2000)
  }
}

export const store = createSlice <IState, typeof getters, typeof mutations, typeof actions> ({name, state, getters, mutations, actions})
export const {commit} = store
import { createSlice, IActionPayload, createSelector } from '../reduex'


const store = {
  name: 'cart',
  state: {
    counter: 10,
    name: 'adsf'
  },
  getters: {
    double: (state):number => state.counter * 2,
    half: (state):number => state.counter / 2
  },
  mutations: {
    addCounter(state, payload:IActionPayload<number>):void {
      state.counter += payload.payload;
    }
  },
  actions: {
    someAsyncAction (payload:number):void {
      commit.addCounter(3)
      setTimeout(() => commit.addCounter(payload), 2000)
    }
  }
}

export const {commit, slice, action} = createSlice <typeof store.state, typeof store.getters, typeof store.mutations, typeof store.actions> (store)
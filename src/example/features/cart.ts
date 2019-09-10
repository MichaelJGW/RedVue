import {createSlice} from '../../RedVue'
import { counter } from './counter'

export const cart = createSlice ({
  name: 'cart',
  state: {
    counter: 10,
    name: 'bob'
  },
  getters: {
    double: (state):number => state.counter * 2,
    half: (state):number => state.counter / 2,
  },
  mutations: {
    changeName (state, payload:string) {
      state.name = payload;
    },
    addCounter (state, payload:number) {
      state.counter += payload;
    }
  },
  actions: {
    someAsyncAction (payload:number) {
      setTimeout(() => cart.commit.addCounter(payload), 500)
      counter.action.addRandomAmountThenSet(100)
      counter.commit.addOne(null);
    }
  }
})
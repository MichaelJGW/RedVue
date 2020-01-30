import { createSlice } from '../../../src/RedVue'
import { ISlice } from "./cart.type";
import { counter } from './counter'

export const slice: ISlice = {
  name: 'cart',
  state: {
    counter: 1
  },
  getters: {
    double(state) {
      return state.counter * 2
    },
    half(state) {
      return state.counter / 2
    }
  },
  mutations: {
    addCounter(state, payload) {
      state.counter += payload;
    }
  },
  actions: {
    someAsyncAction(payload) {
      setTimeout(() => cart.commit.addCounter(payload), 500)
    }
  }
}

export const cart = createSlice( slice )
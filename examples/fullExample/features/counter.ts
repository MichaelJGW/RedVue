import {createSlice} from 'RedVue'

export const counter = createSlice ({
  name: 'counter',
  state: {
    count: 0,
  },
  mutations: {
    addOne (state) {
      state.count += 1
    },
    set (state, payload:number) {
      state.count = payload;
    }
  }
})
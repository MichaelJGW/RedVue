import {createSlice} from '../../RedVue'

export const counter = createSlice ({
  name: 'counter',
  state: {
    count: 0,
  },
  getters: {},
  mutations: {
    addOne (state) {
      state.count += 1
    },
    set (state, payload:number) {
      state.count = payload;
    }
  },
  actions: {
    addRandomAmountThenSet (payload:number) {
      const time = Math.random() * 1000
      const interval = setInterval(() => {
        counter.commit.addOne()
      }, 0);
      setTimeout(() => {
        clearInterval(interval)
        counter.commit.set(payload);
      }, time)
    }
  }
})
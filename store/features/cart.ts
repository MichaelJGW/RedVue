import RedVue from '../RedVue'

export default RedVue.createSlice ({
  name: 'cart',
  state: {
    counter: 10,
    name: 'adsf'
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
    someAsyncAction (context, payload:number) {
      setTimeout(() => context.addCounter(payload), 2000)
    }
  }
})

import RedVue from '../../RedVue'

export const cart = RedVue.createSlice ({
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
      console.log('running action payload', payload)
      setTimeout(() => cart.commit.addCounter(payload), 2000)
    }
  }
})
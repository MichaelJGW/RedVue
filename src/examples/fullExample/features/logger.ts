import {createSlice} from 'RedVue'

type log = {
    timestamp: Date,
    action: string,
    payload: any
}
export const logger = createSlice ({
  name: 'logger',
  state: {
    logs: <log[]> [],
    logging: true
  },
  mutations: {
    insertLog (state, payload:log) {
      console.log('running insertLog')
      if (state.logging) {
        state.logs.push(payload);
      }
    },
    stop (state) {
      state.logging = false
    },
    start (state) {
      state.logging = true
    }
  }
})
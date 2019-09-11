import {createSlice} from '../../RedVue'

type log = {
    timestamp: Date,
    action: string,
    payload: any
}
export const logger = createSlice ({
  name: 'logger',
  state: {
    logs: <log[]> []
  },
  getters: {},
  mutations: {
    insertLog (state, payload:log) {
      state.logs.push(payload);
    }
  },
  actions: {}
})
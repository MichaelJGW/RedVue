import { configureStore as configureReduxStore, createSelector, createSlice as createKitSlice } from 'redux-starter-kit'
export {createSelector}
import store from './store'
export type union<T, U> = T & U
// Action Structure
export type IActionPayload <T> = { type: string, payload: T }
// Reducers object structure
export type IReduces = { [key:string] : (state:any, payload:IActionPayload<any>) => any }
// Gets the Payload type from an object that is of type IActionPayload
export type PullPayloadType<P> = P extends IActionPayload<any> ? P['payload'] : never
// Formats a Reducer Function to remove state and place the payload parameter as the first parameter
export type ReducerToAction<R> = R extends (...args: infer A) => any ? (payload:PullPayloadType<A[1]>) => any : never
// Formats Reducer Functions in a object that matches the type IReduces
export type ReducersToActions<R extends IReduces> = { [K in keyof R]: ReducerToAction<R[K]> }
export type GetterToValue<G extends (...args: any) => any> = { [key:string] : ReturnType<G> }
export type GettersToValues<G> = { [K in keyof G]: GettersToValues<G[K]> }

function updateGetters (state:{}, getters:any):{} {
  Object.keys(getters).forEach(key => state[key] = getters[key](state))
  return state
}

let dispatch = (action:any) => {}

export function configureStore(config) {
  const store = configureReduxStore(config)
  dispatch = store.dispatch;
  return store
}

export type IReduexOptions <S, G, R, E> = {
  name: string
  state: S
  getters: G
  mutations: R
  actions: E
}

export function createSlice <S, G, R extends IReduces, E>(options:IReduexOptions<S, G, R, E>) {
  const reducers = {}
  Object.keys(options.mutations).forEach(key => {
    const reducer = options.mutations[key];
    reducers[key] = function (state, payload) {
      reducer(state, payload),
      state = updateGetters(state, options.getters)
    }
  })
  const slice = createKitSlice({slice: options.name, initialState: updateGetters(options.state, options.getters) as union<GettersToValues<G>,S>, reducers: <any> reducers})
  const commits = {}
  Object.keys(slice.actions).forEach(key => {
    const action = slice.actions[key];
    commits[key] = function (payload) {
      dispatch(action(payload))
      return action(payload)
    }
  })
  return {
    slice,
    commit : commits as any as ReducersToActions<R>,
    action : options.actions as E
  }
}
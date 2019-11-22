import { configureStore as configureReduxStore, createSelector, createSlice as createReduxSlice, combineReducers } from '@reduxjs/toolkit'

// Util Types
type union<T, U> = T & U
type omitFirstParameter<T> = T extends (...args: infer A) => any ? (payload?:A[1]) => any : never
type omitFirstParameters<T> = { [K in keyof T]: omitFirstParameter<T[K]> }
type returnTypes<T> = T extends { [key:string]: (...args) => any} ? { [K in keyof T]: ReturnType<T[K]> } : never

// RedVue Types
type state = object
type getters<S> = { [key:string]: (state:S) => any }
type mutations<S> = { [key:string]: (state:S, payload:any) => void }
type actions = { [key:string]: (payload:any) => void }
type creatSliceOptions <S, G, M, A> = {
  name: string
  state: S & state
  getters?: G & getters<S>
  mutations: M & mutations<S>
  actions?: A & actions
}
// RedVue middleware
type middlewareAction = {
  type: string,
  payload: any
}
type middlewareFunction = (action:middlewareAction) => void;


// Utils
// -----MAP-----
function map (obj:object={}, fn:Function) {
  const newObj = {}
  Object.keys(obj).forEach(key => {
    newObj[key] = fn(obj[key])
  })
  return newObj
}
// -----UPDATE GETTERS-----
function updateGetters (state:{}, getters:any={}):{} {
  Object.keys(getters).forEach(key => state[key] = getters[key](state))
  return state
}

// -----DISPATCH-----
// to hold onto the dispatch for auto dispatching
let dispatch = (action:any) => {}

// -----CONFIGURE STORE-----
export function configureStore (config) {
  const store = configureReduxStore({
    reducer: config.slices,
    ...config
  })
  dispatch = store.dispatch;
  return store
}

// -----CREATE SLICE-----
export function createSlice <S, G, M, A>(options:creatSliceOptions<S, G, M, A>) {
  // before register
  // overwrite mutations into reducers
  const reducers = map(options.mutations, (reducer) => (state, payload) => {
    // Run the reducer
    reducer(state, payload.payload),
    // After the change to state update getter values
    state = updateGetters(state, options.getters)
  })
  
  // Register
  const slice = createReduxSlice({
    name: options.name,
    initialState: updateGetters(options.state, options.getters) as union<S, returnTypes<typeof options.getters>>,
    reducers: <any> reducers
  })

  // after register
  // set all mutations to auto dispatch
  const commits = map(slice.actions, (action) => (payload) => {
    dispatch(action(payload))
    return action(payload)
  })
  // change actions to have the context
  const actions = map(options.actions, (action) => (payload) => action(payload))
  return {
    slice,
    register: slice.reducer,
    commit : commits as omitFirstParameters<M>,
    action : actions as A
  }
}

export function middleware (fn:middlewareFunction): Function {
  return () => next => (action:middlewareAction) => {
    fn(action);
    next(action);
  };
}

// -----ADDITIONAL EXPORTS-----
// rename
export const combineSlices = combineReducers
// pass through
export {createSelector}
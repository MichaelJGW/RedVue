import { configureStore as configureReduxStore, createSelector, createSlice as createKitSlice } from 'redux-starter-kit'
export {createSelector}

export type union<T, U> = T & U
export type IReduexOptions <S, G, M, A> = {
  name: string
  state: S
  getters: G & { [key:string]: (state:S) => any }
  mutations: M & { [key:string]: (state:S, payload:any) => any }
  actions: A & { [key:string]: (context, payload:any) => any }
}

// Remove the first parameter with the second
export type omitFirstParameter<T> = T extends (...args: infer A) => any ? (payload:A[1]) => any : never
export type omitFirstParameters<T> = { [K in keyof T]: omitFirstParameter<T[K]> }
// MUTATIONS
// object structure
export type mutations<S> = { [key:string] : (state:S, payload:any) => any }

// ACTIONS
// Reducers object structure
export type actions<C> = { [key:string] : (context:C, payload:any) => any }
// Remove state and place the payload parameter as the first parameter
export type FormattedAction<M> = M extends (...args: infer A) => any ? (payload:A[1]) => any : never
// export type FormattedCommits<M> = { [K in keyof M]: MutationToCommit<M[K]> }



function map (obj:object, fn:Function) {
  const newObj = {}
  Object.keys(obj).forEach(key => {
    newObj[key] = fn(obj[key])
  })
  return newObj
}

let dispatch = (action:any) => {}

function updateGetters (state:{}, getters:any):{} {
  Object.keys(getters).forEach(key => state[key] = getters[key](state))
  return state
}

export function configureStore(config) {
  const store = configureReduxStore(config)
  dispatch = store.dispatch;
  return store
}

export function createSlice <S, G, M, A>(options:IReduexOptions<S, G, M, A>) {
  // BEFORE REGISTER
  // overwrite mutations into reducers
  const reducers = map(options.mutations, (reducer) => (state, payload) => {
    // Run the reducer
    reducer(state, payload.payload),
    // After the change to state update getter values
    state = updateGetters(state, options.getters)
  })
  
  // REGISTER
  const slice = createKitSlice({
    slice: options.name,
    // initialState: updateGetters(options.state, options.getters) as union< GettersToValues<IReduexOptions<S>['mutations'], S>, S>,
    initialState: updateGetters(options.state, options.getters) as union<S, typeof options.getters>,
    reducers: <any> reducers
  })

  // AFTER REGISTER
  // set all mutations to auto dispatch
  
  const commits = map(slice.actions, (action) => (payload) => {
    dispatch(action(payload))
    return action(payload)
  })
  // change actions to have the context
  const actions = map(options.actions, (action) => (payload) => action(commits, payload))
  return {
    slice,
    commit : commits as omitFirstParameters<M>,
    action : actions as omitFirstParameters<A>,
    initState: updateGetters(options.state, options.getters) as union<S, typeof options.getters>
  }
}
import { configureStore as configureReduxStore, createSelector, createSlice as createKitSlice, combineReducers } from 'redux-starter-kit'

// Util Types
type union<T, U> = T & U
type omitFirstParameter<T> = T extends (...args: infer A) => any ? (payload:A[1]) => any : never
type omitFirstParameters<T> = { [K in keyof T]: omitFirstParameter<T[K]> }
type returnTypes<T> = T extends { [key:string]: (...args) => any} ? { [K in keyof T]: ReturnType<T[K]> } : never

// RedVue Types
type state = object
type getters<S> = { [key:string]: (state:S) => any }
type mutations<S> = { [key:string]: (state:S, payload:any) => void }
type actions<C> = { [key:string]: (context:C, payload:any) => void }
type creatSliceOptions <S, G, M, A> = {
  name: string
  state: S & state
  getters: G & getters<S>
  mutations: M & mutations<S>
  actions: A & actions<any>
}

class RedVue {

  // Utils
  private map (obj:object, fn:Function) {
    const newObj = {}
    Object.keys(obj).forEach(key => {
      newObj[key] = fn(obj[key])
    })
    return newObj
  }
  private updateGetters (state:{}, getters:any):{} {
    Object.keys(getters).forEach(key => state[key] = getters[key](state))
    return state
  }

  // to hold onto the dispatch for auto dispatching
  private dispatch = (action:any) => {}

  // For single import
  public createSelector = createSelector
  public combineSlices = combineReducers

  // Functions
  public configureStore (config) {
    const store = configureReduxStore({
      reducer: config.slices,
      ...config
    })
    this.dispatch = store.dispatch;
    return store
  }
  public createSlice <S, G, M, A>(options:creatSliceOptions<S, G, M, A>) {
    // BEFORE REGISTER
    // overwrite mutations into reducers
    const reducers = this.map(options.mutations, (reducer) => (state, payload) => {
      // Run the reducer
      reducer(state, payload.payload),
      // After the change to state update getter values
      state = this.updateGetters(state, options.getters)
    })
    
    // REGISTER
    const slice = createKitSlice({
      slice: options.name,
      initialState: this.updateGetters(options.state, options.getters) as union<S, returnTypes<typeof options.getters>>,
      reducers: <any> reducers
    })
  
    // AFTER REGISTER
    // set all mutations to auto dispatch
    
    const commits = this.map(slice.actions, (action) => (payload) => {
      this.dispatch(action(payload))
      return action(payload)
    })
    // change actions to have the context
    const actions = this.map(options.actions, (action) => (payload) => action(commits, payload))
    return {
      slice,
      commit : commits as omitFirstParameters<M>,
      action : actions as omitFirstParameters<A>
    }
  }
}

export default new RedVue()
export {createSelector}
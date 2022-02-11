import { configureStore as configureReduxStore, createSlice as createReduxSlice, combineReducers, } from '@reduxjs/toolkit'
// Types
import { omitFirstParameters, returnTypes, union } from "./types/utils";
import { IConfigureStore } from "./types/store";
import { createSliceOptions } from "./types/slices";
import { mapObj, noop } from './utils'
import { combineStateAndGetters } from "./combineStateAndGetters";
export { middleware } from './middleware'
// -----UPDATE GETTERS-----


// -----DISPATCH-----
// This is declared in initStore for now it is noop
let dispatch = noop
// Export the store so for easier lazy loading.
export let store = {} as any
// ---REGISTERING SLICES---
let registeredSlices = {};
let combinedReducers = {} as any

export function combineSlices(newReducers) {
    registeredSlices = {
        ...registeredSlices,
        ...newReducers
    }
    const combined = combineReducers(registeredSlices)
    if (store.replaceReducer) { // If the store has been called just replace the reducers
        store.replaceReducer(combined)
    }
    combinedReducers = combined
    return combined;
}

// -----CONFIGURE STORE-----
export function initStore(config: IConfigureStore): ReturnType<typeof configureReduxStore> {
    const configuration: any = { ...config }
    configuration.reducer = combinedReducers
    store = configureReduxStore({ ...configuration } as any)
    dispatch = store.dispatch;
    return store
}

// -----CREATE SLICE-----
export function createSlice<S, G, M, A>(options: createSliceOptions<S, G, M, A>) {
    // before register
    // overwrite mutations into reducers
    const reducers = mapObj(options.mutations, (reducer) => (state, payload) => {
        // Run the reducer
        reducer(state, payload.payload),
            // After the change to state update getter values
            state = combineStateAndGetters(state, options.getters)
    })

    // Register
    const slice = createReduxSlice({
        name: options.name,
        initialState: combineStateAndGetters(options.state, options.getters) as union<S, returnTypes<typeof options.getters>>,
        reducers: <any>reducers
    })

    // after register
    // set all mutations to auto dispatch
    const commits = mapObj(slice.actions, (action) => (payload) => {
        dispatch(action(payload))
        return action(payload)
    })
    // change actions to have the context
    const actions = mapObj(options.actions, (action) => (payload) => action(payload))
    combineSlices({
        [slice.name]: slice.reducer
    })
    return {
        IState: null as union<S, returnTypes<typeof options.getters>>,
        slice,
        commit: commits as omitFirstParameters<M>,
        action: actions as A
    }
}

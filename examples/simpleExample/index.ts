import {configureStore, createSlice, combineSlices} from '../../dist/RedVue'

type rootState = ReturnType<typeof slices>

// Setup Slices
const counter = createSlice ({
    name: 'counter',
    state: { count: 0 },
    mutations: { addOne: (state) => state.count += 1 }
})

const slices = combineSlices({ counter: counter.register })
// Setup Store
const store = configureStore({ slices })

// Usage
store.subscribe(() => {
    const state:rootState = store.getState()
    console.log(store.getState())
})

counter.commit.addOne()


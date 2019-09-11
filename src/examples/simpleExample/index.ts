import {configureStore, createSlice, combineSlices} from 'RedVue'

// Setup Slices
const counter = createSlice ({
    name: 'counter',
    state: { count: 0 },
    mutations: { addOne: (state) => state.count += 1 }
})

// Setup Store
const store = configureStore({ 
    slices: combineSlices({ counter: counter.slice.reducer })
})

// Usage
store.subscribe(() => {
    console.log(store.getState())
})

counter.commit.addOne()
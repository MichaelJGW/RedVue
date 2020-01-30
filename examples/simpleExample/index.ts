import { createSlice, store, initStore} from '../../src/RedVue'

// Setup Slices

const counter = createSlice ({
    name: 'counter',
    state: { count: 0 },
    mutations: { addOne: (state) => state.count += 1 }
})

initStore()

// Usage
store.subscribe(() => {
    const state = store.getState()
    console.log(state)
})

counter.commit.addOne()


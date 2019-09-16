const redvue = require ('../../dist/RedVue')

// Setup Slices
const counter = redvue.createSlice ({
    name: 'counter',
    state: { count: 0 },
    mutations: { addOne: (state) => state.count += 1 }
})

// Setup Store
const store = redvue.configureStore({ 
    slices: redvue.combineSlices({ counter: counter.register })
})

// Usage

counter.commit.addOne()
console.log(store.getState())
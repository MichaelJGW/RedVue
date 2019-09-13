# RedVue
RedVue is a state management system that is easy to use, setup, and supports TypeScript out of the box.

## About

I have found favor in Vuex however it is limited to Vue applications. I also like Redux as you can take it anywhere. RedVue is a mixture of the two Red~~ux~~ & Vue~~x~~ `RedVue`. It is based on Vuex with the guts of Redux.


## Simple Example

```js
import {configureStore, createSlice, combineSlices} from 'RedVue'

// Setup Slices
const counter = createSlice ({
    name: 'counter',
    state: { count: 0 },
    mutations: { addOne: (state) => state.count += 1 }
})

// Setup Store
const store = configureStore({ 
    slices: combineSlices({ counter: counter.register })
})

// Usage
store.subscribe(() => {
    console.log(store.getState())
})

counter.commit.addOne()
```

# API
## Slice

```js

const myStore = createSlice ({
  name: 'store', // Name of the slice
  state: { // The initial state
    products: [],
    sortBy: 'price'
  },
  getters: { // State values that change when a mutation is fired.
    filteredProducts (state) {
      const key = state.sortBy
      return state.products.sort((a,b) => a[key] - b[key])
    }
  },
  mutations: { // This is the only location changes to the state occur.
    addProducts (state, payload) {
      state.products = payload;
    }
  },
  actions: { // This is where you can do async calls
    getProducts () {
      fetch('/api/getProducts/')
      .then(res => res.json())
      .then(products => myStore.commit.addProducts(products))
    }
  }
})

```

#### State
This is the initial value of the state.
#### Getters
In this case whenever any of the mutations fire
for this slice the filteredProducts function is ran
and a value call filteredProducts is appended to the
state object with the returned value of this function.

So all that needs to be done is change sortBy to name
and the filteredProducts will auto calculate the filtered
values to be sorted by name vs price.
#### Mutations
These are functions that change state.
Unlike Redux you can mutate the state like Vuex
#### Actions
These are just functions that can dispatch mutations at any time to handle async tasks like fetching an API.

# Repo

# Examples

In the Repo we have a Simple and a Full Example

The Full Example has multiple slices, tests, middleware and so much more.

Take a look at the code and see if it would work for your next project.

# Setup and Run
```
npm i
npm run start
```

# Blog post
https://medium.com/@michaeljwarner9/redux-written-like-vuex-b5ad606aa0a7

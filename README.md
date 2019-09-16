# RedVue
RedVue is a state management system that is easy to use, setup, and supports TypeScript out of the box.

## Quick Start

```bash
npm i redvue
```

```js
const RedVue = require('RedVue')
// Setup Slices
const counter = RedVue.createSlice ({
    name: 'counter',
    state: { count: 0 },
    mutations: { addOne: (state) => state.count += 1 }
})
// Slices
const slices = RedVue.combineSlices({
  counter: counter.register
})
// Setup Store
const store = RedVue.configureStore({ slices })
// Usage
console.log(store.getState()) // { counter: { count: 0 } }
counter.commit.addOne()
console.log(store.getState()) // { counter: { count: 1 } }
```

## About

I have found favor in Vuex however it is limited to Vue applications. I also like Redux as you can take it anywhere. RedVue is a mixture of the two Red~~ux~~ & Vue~~x~~ `RedVue`. It is based on Vuex with the guts of Redux.

## TypeScript Support

### Types are supported out of the box.
#### Mutations
Mutations already know the state by default.

![State Type Checking](https://i.ibb.co/3mF5xZV/Screen-Shot-2019-09-16-at-11-43-30-AM.png)
#### Mutation Payloads
If you add a type to a payload. It will automatically pass the type to the execution of the mutations.

<B>This also works with actions!!!</B>

![Mutation Type Setup](https://i.ibb.co/bNXhzSK/Screen-Shot-2019-09-16-at-11-44-59-AM.png)
![Mutation Usage](https://i.ibb.co/w74BCJW/Screen-Shot-2019-09-16-at-11-44-50-AM.png)

#### State and Getters
When getting State outside of the slice the getters will automatically be added to the state object returned.
`This is the only type checking where you will need to add code that is not directly related to your own. you will need to add the following where slices is the returned value of combineSlices.`
```ts
type rootState = ReturnType<typeof slices>
```

![getters setup](https://i.ibb.co/Qcvr9Vc/Screen-Shot-2019-09-16-at-1-36-07-PM.png)
![state typed](https://i.ibb.co/t292Q3M/Screen-Shot-2019-09-16-at-1-37-10-PM.png)


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

# Setup and Run the Repo
```bash
npm i
npm run start
```

# Blog post
https://medium.com/@michaeljwarner9/redux-written-like-vuex-b5ad606aa0a7

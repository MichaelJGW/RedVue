# RedVue
RedVue is Redux in a Style inspired by Vuex.

## Quick Start

```bash
npm i redvue
```

```js
import { createSlice, store, initStore} from 'redvue'

// Setup Slices
const counter = createSlice ({
    name: 'counter',
    state: { count: 0 },
    getters: { double: state => state.count * 2 },
    mutations: { addOne: state => state.count += 1 }
})

// Define App State Structure 
interface AppState {
    counter: typeof counter['IState']
}

// Initialize Store
initStore()

// Getting State
store.subscribe(() => {
    const state = store.getState() as AppState
    console.log(state)
})

// Committing a Change to State
counter.commit.addOne()


//Outputs --> { counter: { count: 1 } }
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

## Store
```js
configureStore({
  middleware: [middleware()],
  devTools: false
})
```

### middleware
An Array of middleware functions that fire after each action.

### devTools
This is a boolean value to enable the [Redux devtools](https://github.com/zalmoxisus/redux-devtools-extension).


## Middleware
Events that will trigger after each action and be given the Redux action signature.

### Example

#### Creation
```js
// middleware/log file
import { logAction } from 'logSlice';
import { middleware } from 'RedVue';

export const logMiddleware = middleware((action) => {
  // So it won't trigger itself
  if (action.type !== 'log/insertLog') {
    // Log the Action
    logAction.commit.insertLog({
        timestamp: new Date(),
        action: action.type,
        payload: action.payload
    })
  }
})
```

####Registering
```js
// Store file
import {log} from 'middleware/log'

configureStore({
  middleware: [log],
  devTools: false
})
```
# Repo

# Examples

In the Repo we have a Examples in the examples folder check them out.

# Build Setup and Run the Repo
```bash
npm i
npm run start
```

# Feedback
PLEASE!!! Leave feedback and comments I don't care if you say it sucks just let me know what you think. Thanks! 
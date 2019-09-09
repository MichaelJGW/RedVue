# RedVue
RedVue is a state management system that is easy to use, setup, and supports TypeScript out of the box.

## About

I have found the ease of use for Vuex to be the outstanding. I also like Redux as you can take it anywhere you go. So this is a mixure of the two Red~~ux~~ & Vue~~x~~ (RedVue). It is based on Redux but the ease of use through the style of Vuex.


## Usage

### Create a Slice
```js
import RedVue from 'RedVue'

export default RedVue.createSlice ({
  name: 'cart',
  state: {
    counter: 10
  },
  mutations: {
    addCounter (state, payload:number) {
      state.counter += payload;
    }
  }
})

```

### Combine all Slices together

```js
import RedVue from 'RedVue';
import cart from './cart'
import someOtherSlice from './someOtherSlice'

export default RedVue.combineSlices({
  cart: cart.slice.reducer,
  other: someOtherSlice.slice.reducer
})

```

### Create a Store
```js
import RedVue from 'RedVue'
import slices from './slices'

export const store = RedVue.configureStore({
  reducer: slices
})

export type rootState = rootState
export default store
```

### Import and start using it

```
import {store} from './store'
import cart from './cart'

store.subscribe(() => {
  console.log(store.getState())
})

cart.commit.addCounter(1)
```

# API
## Slice

```js

export default RedVue.createSlice ({
  name: 'cart',
  state: {
    counter: 10,
    name: 'adsf'
  },
  getters: {
    double: (state):number => state.counter * 2,
    half: (state):number => state.counter / 2,
  },
  mutations: {
    changeName (state, payload:string) {
      state.name = payload;
    },
    addCounter (state, payload:number) {
      state.counter += payload;
    }
  },
  actions: {
    someAsyncAction (context, payload:number) {
      setTimeout(() => context.addCounter(payload), 2000)
    }
  }
})

```

#### State
This is the initial value of the state.
#### Getters
These are functions that run every time the state changes. This is to auto calculate something based on state. Use cases would be filtering a list based on state changes to the filter flags. You just change the flag and the list automaticly filter the request.
#### Mutations
These are functions that change state.
#### Actions
These are just functions that can dispatch mutations at any time to handle async tasks like fetching an API.

# Repo

# Setup and Run
```
npm i
npm run start
```

# Blog post
https://medium.com/@michaeljwarner9/redux-written-like-vuex-b5ad606aa0a7

import { createSlice, store, initStore} from '../../src/RedVue'

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


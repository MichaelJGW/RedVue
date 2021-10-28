

import { createSlice, store, initStore } from '../src/RedVue'

const initialCounterState = { count: 0 };
// Setup Slices
const counter = createSlice({
    name: 'counter',
    state: initialCounterState,
    getters: { double: state => state.count * 2 },
    mutations: {
        addOne: state => state.count += 1,
        resetState: (state) => Object.assign(state, initialCounterState)
    }
})

// Initialize Store
initStore()


// Define App State Structure 
interface AppState {
    counter: typeof counter['IState'],
}


describe('LazyLoading', () => {

    beforeEach(() => {
        counter.commit.resetState()
    })

    it('should have have counter2', () => {
        const state = store.getState() as AppState
        expect(state.counter.count).toEqual(0)
        expect((state as any).counter2).toEqual(undefined)
    })

    it('should be load counter2', () => {
        const initialCounter2State = { count: 0 };
        // Setup Slices
        const counter2 = createSlice({
            name: 'counter2',
            state: initialCounter2State,
            getters: { double: state => state.count * 2 },
            mutations: {
                addOne: state => state.count += 1,
                resetState: (state) => Object.assign(state, initialCounter2State)
            }
        })
        // Define App State Structure 
        interface AppState {
            counter: typeof counter['IState'],
            counter2: typeof counter2['IState']
        }
        let state = store.getState() as AppState
        expect(state.counter.count).toEqual(0)
        expect(state.counter2.count).toEqual(0)
        counter2.commit.addOne()
        state = store.getState() as AppState
        expect(state.counter.count).toEqual(0)
        expect(state.counter2.count).toEqual(1)
    })

});

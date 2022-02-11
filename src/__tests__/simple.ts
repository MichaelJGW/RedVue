
import { createSlice, store, initStore } from '../RedVue'

const initialState = { count: 0 };
// Setup Slices
const counter = createSlice({
    name: 'counter',
    state: initialState,
    getters: { double: state => state.count * 2 },
    mutations: { 
        addOne: state => state.count += 1,
        add: (state, payload:number) => state.count += payload,
        resetState: (state) => Object.assign(state, initialState)
    }
})

// Initialize Store
initStore()

// Define App State Structure 
interface AppState {
    counter: typeof counter['IState']
}

describe('Does a simple counter work', () => {

    beforeEach(() => {
        counter.commit.resetState()
    })

    it('should have a count state of 0', () => {
        const state = store.getState() as AppState
        expect(state.counter.count).toEqual(0)
    })

    it('should have a state prop call double and it should be twice the amount of count', () => {
        let state = store.getState() as AppState
        expect(state.counter.count).toEqual(0)
        expect(state.counter.double).toEqual(0)
        counter.commit.addOne()
        state = store.getState() as AppState
        expect(state.counter.count).toEqual(1)
        expect(state.counter.double).toEqual(2)
    })


    it('should have called subscribe for each time a commit happened', () => {
        let callCount = 0
        // Getting State
        let state = store.getState() as AppState

        store.subscribe(() => {
            callCount++
            state = store.getState() as AppState
        })
        
        counter.commit.addOne()
        counter.commit.addOne()
        counter.commit.addOne()

        expect(callCount).toEqual(3)
        expect(state.counter.count).toEqual(3)
    })

    it('should have the types correct', () => {
        counter.commit.addOne()
        let state = store.getState() as AppState
        expect(state.counter.count + 1).toEqual(2)
        expect(state.counter.double + 1).toEqual(3)
        counter.commit.add(3);
    })
});

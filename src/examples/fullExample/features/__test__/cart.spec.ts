
import { combineSlices, configureStore } from 'RedVue'
import {cart} from '../cart';

let slices = combineSlices({ cart: cart.register })
let store = configureStore({ slices })
type rootState = ReturnType<typeof slices>

describe ('Cart', () => {
    beforeAll(() => {
        slices = combineSlices({ cart: cart.register })
        store = configureStore({ slices })
    })
    describe('State', () => {
        it('should be have the init counter value of 0', () => {
            let state:rootState = store.getState()
            expect(state.cart.counter).toBe(0)
        })
    })
    describe('Getters', () => {
        it('should be update double when counter changes', () => {
            let state:rootState = store.getState()
            expect(state.cart.double).toBe(0)
            cart.commit.addCounter(10);
            state = store.getState()
            expect(state.cart.double).toBe(20)
        })
    })
    describe('Mutations', () => {
        it('should be able to add to the counter', () => {
            let state:rootState = store.getState()
            const initCount = state.cart.counter;
            cart.commit.addCounter(10)
            state = store.getState()
            expect(state.cart.counter).toBe(initCount + 10)
        })
    })
    describe('Actions', () => {
        it('should be able to add to the counter with a timeout', () => {
            let state:rootState = store.getState()
            const initCount = state.cart.counter;
            cart.action.someAsyncAction(10)
            store.subscribe(() => {
                state = store.getState()
                expect(state.cart.counter).toBe(initCount + 10)
            })
        })
    })
})
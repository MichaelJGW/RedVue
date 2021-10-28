
import { createSlice, store, initStore, middleware } from '../src/RedVue'

const initialState = { count: 0 };
// Setup Slices
const counter = createSlice({
    name: 'counter',
    state: initialState,
    getters: { double: state => state.count * 2 },
    mutations: { 
        addOne: state => state.count += 1,
        resetState: (state) => Object.assign(state, initialState)
    },
    actions: {
        noop () {}
    }
})

let logs:{type:string, payload:any}[] = [] 
const loggerMiddleware = middleware((action) => {
    logs.push(action)
})

// Initialize Store
initStore({middleware:[loggerMiddleware]})

describe('Middleware', () => {
    beforeEach(() => {
        counter.commit.resetState()
        logs = []
    })

    it('should log the commits sent', () => {
        expect(logs.length).toEqual(0)
        counter.commit.addOne()
        expect(logs.length).toEqual(1)
        expect(JSON.stringify(logs[0])).toBe(JSON.stringify({type: 'counter/addOne', payload: undefined}))
    })

    it('should not log the actions', () => {
        expect(logs.length).toEqual(0)
        counter.action.noop()
        expect(logs.length).toEqual(0)
    })
})
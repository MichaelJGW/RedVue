
export type IState = ISlice['state']
export interface ISlice {
    name: string
    state: {
        counter: number
        // Getters
        double?: number
        half?: number
    }
    getters: {
        double: (state: IState) => ISlice['state']['double']
        half: (state: IState) => ISlice['state']['half']
    },
    mutations: {
        addCounter: (state: IState, payload: number) => void
    }
    actions: {
        someAsyncAction: (payload: number) => void
    }
}
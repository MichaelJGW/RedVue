import { createSliceOptions } from "../../../src/types/slices";

export type IState = ICounter['state']

export interface ICounter {
    name: string,
    state: {
        counter: number,
        double?: number
    }
    getters: {
        double: (state: IState) => IState['double']
    }
    mutations: {
        addOne: (state:IState) => void
    }
    actions: {
    }
}

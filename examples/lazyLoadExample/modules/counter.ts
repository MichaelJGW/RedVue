import { createSlice } from "../../../src/RedVue";
import { ICounter } from "./counter.type";

const slice:ICounter = {
    name: 'counter',
    state: {
        counter: 0
    },
    getters: {
        double(state){
            return state.counter * 2;
        }
    },
    mutations: {
        addOne(state) {
            state.counter++
        }
    }
}

export const counterSlice = createSlice(slice)

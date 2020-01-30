import { createSlice } from "../../../src/RedVue";
import { IStatus } from "./status.type";

const slice: IStatus = {
    name: 'status',
    state: {
        status: 1
    },
    mutations: {
        changeStatus (state, payload: number) {
            state.status = payload
        }
    }
}

export const statusSlice = createSlice(slice)

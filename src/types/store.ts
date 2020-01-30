import { combineReducers } from '@reduxjs/toolkit'


// RedVue Types
export type IConfigureStore = {
    middleware?: Function[]
    devTools?: boolean
} | void

import { configureStore as configureReduxStore, createSelector } from '@reduxjs/toolkit';
import { omitFirstParameters, returnTypes, union } from "./types/utils";
import { IConfigureStore } from "./types/store";
import { createSliceOptions } from "./types/slices";
import { middlewareFunction } from "./types/middleware";
export declare let store: any;
export declare function combineSlices(newReducers: any): import("redux").Reducer<unknown, import("redux").AnyAction>;
export declare function initStore(config: IConfigureStore): ReturnType<typeof configureReduxStore>;
export declare function createSlice<S, G, M, A>(options: createSliceOptions<S, G, M, A>): {
    slice: import("@reduxjs/toolkit").Slice<union<S, returnTypes<G & import("./types/slices").IGetters<S>>>, any>;
    commit: omitFirstParameters<M>;
    action: A;
};
export declare function middleware(fn: middlewareFunction): Function;
export { createSelector };

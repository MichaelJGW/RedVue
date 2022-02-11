import { configureStore as configureReduxStore } from '@reduxjs/toolkit';
import { omitFirstParameters, returnTypes, union } from "./types/utils";
import { IConfigureStore } from "./types/store";
import { createSliceOptions } from "./types/slices";
export { middleware } from './middleware';
export declare let store: any;
export declare function combineSlices(newReducers: any): import("redux").Reducer<import("redux").EmptyObject, import("redux").AnyAction>;
export declare function initStore(config: IConfigureStore): ReturnType<typeof configureReduxStore>;
export declare function createSlice<S, G, M, A>(options: createSliceOptions<S, G, M, A>): {
    IState: union<S, G>;
    slice: import("@reduxjs/toolkit").Slice<union<S, returnTypes<G & import("./types/slices").IGetters<S>>>, any, string>;
    commit: omitFirstParameters<M>;
    action: A;
};

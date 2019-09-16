import { createSelector, combineReducers } from 'redux-starter-kit';
declare type union<T, U> = T & U;
declare type omitFirstParameter<T> = T extends (...args: infer A) => any ? (payload?: A[1]) => any : never;
declare type omitFirstParameters<T> = {
    [K in keyof T]: omitFirstParameter<T[K]>;
};
declare type returnTypes<T> = T extends {
    [key: string]: (...args: any[]) => any;
} ? {
    [K in keyof T]: ReturnType<T[K]>;
} : never;
declare type state = object;
declare type getters<S> = {
    [key: string]: (state: S) => any;
};
declare type mutations<S> = {
    [key: string]: (state: S, payload: any) => void;
};
declare type actions = {
    [key: string]: (payload: any) => void;
};
declare type creatSliceOptions<S, G, M, A> = {
    name: string;
    state: S & state;
    getters?: G & getters<S>;
    mutations: M & mutations<S>;
    actions?: A & actions;
};
declare type middlewareAction = {
    type: string;
    payload: any;
};
declare type middlewareFunction = (action: middlewareAction) => void;
export declare function configureStore(config: any): import("redux-starter-kit").EnhancedStore<any, import("redux").AnyAction>;
export declare function createSlice<S, G, M, A>(options: creatSliceOptions<S, G, M, A>): {
    slice: import("redux-starter-kit").Slice<union<S, returnTypes<G & getters<S>>>, {
        [x: string]: import("redux-starter-kit").PayloadActionCreator<void, string, void> | import("redux-starter-kit").PayloadActionCreator<unknown, string, void> | ({
            type: string;
        } & ((...args: unknown[]) => import("redux-starter-kit").PayloadAction<unknown, string, unknown>)) | ({
            type: string;
        } & ((...args: unknown[]) => import("redux-starter-kit").PayloadAction<unknown, string, void>));
    }>;
    register: import("redux").Reducer<union<S, returnTypes<G & getters<S>>>, import("redux").AnyAction>;
    commit: omitFirstParameters<M>;
    action: A;
};
export declare function middleware(fn: middlewareFunction): Function;
export declare const combineSlices: typeof combineReducers;
export { createSelector };

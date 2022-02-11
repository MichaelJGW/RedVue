export declare type union<T, U> = T & U;
export declare type omitFirstParameter<T> = T extends (...args: infer A) => any ? optionalPayloadFunction<A[1]> : never;
export declare type optionalPayloadFunction<payload> = payload extends undefined ? () => any : (payload: payload) => any;
export declare type omitFirstParameters<T> = {
    [K in keyof T]: omitFirstParameter<T[K]>;
};
export declare type returnTypes<T> = T extends {
    [key: string]: (...args: any[]) => any;
} ? {
    [K in keyof T]: ReturnType<T[K]>;
} : never;

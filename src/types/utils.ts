// Util Types
export type union<T, U> = T & U
export type omitFirstParameter<T> = T extends (...args: infer A) => any ? optionalPayloadFunction<A[1]> : never
export type optionalPayloadFunction<payload> = payload extends undefined ? () => any : (payload:payload) => any
export type omitFirstParameters<T> = { [K in keyof T]: omitFirstParameter<T[K]> }
export type returnTypes<T> = T extends { [key: string]: (...args) => any } ? { [K in keyof T]: ReturnType<T[K]> } : never

// Util Types
export type union<T, U> = T & U
export type omitFirstParameter<T> = T extends (...args: infer A) => any ? (payload?: A[1]) => any : never
export type omitFirstParameters<T> = { [K in keyof T]: omitFirstParameter<T[K]> }
export type returnTypes<T> = T extends { [key: string]: (...args) => any } ? { [K in keyof T]: ReturnType<T[K]> } : never

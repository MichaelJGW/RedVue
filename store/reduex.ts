import { createSelector, createSlice as createKitSlice } from 'redux-starter-kit'
export {createSelector}
export type IReduexOptions <S, Se, R, E> = {
  slice: string
  initialState: S
  selectors: Se
  reducers: R 
  effects: E
}
// Action Structure
export type IActionPayload <T> = { type: string, payload: T }
// Reducers object structure
export type IReduces = { [key:string] : (state:any, payload:IActionPayload<any>) => any }
// Gets the Payload type from an object that is of type IActionPayload
export type PullPayloadType<P> = P extends IActionPayload<any> ? P['payload'] : never
// Formats a Reducer Function to remove state and place the payload parameter as the first parameter
export type ReducerToAction<R> = R extends (...args: infer A) => any ? (payload:PullPayloadType<A[1]>) => any : never
// Formats Reducer Functions in a object that matches the type IReduces
export type ReducersToActions<R extends IReduces> = { [K in keyof R]: ReducerToAction<R[K]> }

export function createSlice <S, Se, R extends IReduces, E>(options:IReduexOptions<S, Se, R, E>) {
  const slice = createKitSlice({slice: options.slice, initialState: options.initialState, reducers: <any> options.reducers})
  return {
    slice,
    selectors: options.selectors as Se,
    actions : slice.actions as any as ReducersToActions<R>,
    effects : options.effects as E
  }
}
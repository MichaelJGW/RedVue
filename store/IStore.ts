export interface ISlice <S, Se, R, E> {
  slice: string
  reducer?: Object
  initialState?: S
  selectors: Se
  reducers: R
  effects: E
}
export interface IActionPayload <T> {
  type: string,
  payload: T
}
export interface IDispatch { (payload: any): void }
export interface IReducer <S, T> { (state:S, payload: IActionPayload<T>): void }
export interface IAction <T> { (payload: T): any }
export interface IEffect <T> { (dispatch:IDispatch, payload:T) : void }
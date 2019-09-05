import { createSlice as createKitSlice } from 'redux-starter-kit'

export interface IReduexOptions <S, Se, R, E> {
  slice: string
  initialState: S
  selectors: Se
  reducers: R 
  effects: E
}
export interface IActionPayload <T> {
  type: string,
  payload: T
}

export function createSlice <S, Se, R, E>(options:IReduexOptions<S, Se, R, E>) {
  const slice = createKitSlice({slice: options.slice, initialState: options.initialState, reducers: <any> options.reducers})

  return {
    slice,
    selectors : options.selectors as Se,
    actions : slice.actions,
    effects : options.effects as E
  }
}

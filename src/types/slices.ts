export interface createSliceOptions<State, Getters, Mutations, Actions> {
    name: string
    state: State & IState
    getters?: Getters & IGetters<State>
    mutations: Mutations & IMutations<State>
    actions?: Actions & IActions
}

export interface IState { [key: string]: any }
export interface IGetters<S> { [key: string]: (state: S) => any }
export interface IMutations<S> { [key: string]: (state: S, payload: any) => void }
export interface IActions { [key: string]: (payload: any) => void }
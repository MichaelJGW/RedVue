export type IState = IStatus['state']

export interface IStatus {
    name: string,
    state: {
        status: number
    },
    mutations: {
        changeStatus: (state: IState, payload: number) => void
    }
}

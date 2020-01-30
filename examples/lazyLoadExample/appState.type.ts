import { IState as ICounter } from "./modules/counter.type";
import { IState as IStatus } from "./modules/status.type";

export interface IAppState {
    counter: ICounter
    status: IStatus
}
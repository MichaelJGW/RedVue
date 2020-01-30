// This is so we don't have to constantly pull IAppState when we get state

import { store } from "../../src/RedVue";
import { IAppState } from "./appState.type";

export const subscribe = (cb: (state: IAppState) => void) => store.subscribe(() => cb(store.getState() as IAppState))
export const getState = (): IAppState => store.getState()
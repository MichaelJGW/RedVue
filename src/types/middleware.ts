// RedVue middleware
export type middlewareAction = {
    type: string,
    payload: any
}
export type middlewareFunction = (action: middlewareAction) => void;


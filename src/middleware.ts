import { middlewareAction, middlewareFunction } from "./types/middleware";

export function middleware(fn: middlewareFunction): Function {
    return () => next => (action: middlewareAction) => {
        fn(action);
        next(action);
    };
}
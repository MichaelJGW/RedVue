export declare type middlewareAction = {
    type: string;
    payload: any;
};
export declare type middlewareFunction = (action: middlewareAction) => void;

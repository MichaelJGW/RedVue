export const logger = store => next => action => {
    if (action.type !== 'logger/insertLog') {
        store.dispatch({ type: 'logger/insertLog', payload: {
            timestamp: Date.now(),
            action: action.type,
            payload: action.payload
        }})
    }
    next(action);
};
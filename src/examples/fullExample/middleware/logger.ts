import { logger as loggerAction } from './../features/logger';
import { middleware } from 'RedVue';

export const logger = middleware((action) => {
    loggerAction.commit.insertLog({
        timestamp: new Date(),
        action: action.type,
        payload: action.payload
    })
})
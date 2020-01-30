import { logger as loggerAction } from './../features/logger';
import { middleware } from '../../../src/RedVue';

export const logger = middleware((action) => {
    if (action.type !== 'logger/insertLog' || false) {
        loggerAction.commit.insertLog({
            timestamp: new Date(),
            action: action.type,
            payload: action.payload
        })
    }
})
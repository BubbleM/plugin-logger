import { Ursa } from '@ursajs/core';
import { UrsaLogger, ContextLogger } from '@ursajs/logger';
import * as path from 'path';
import { TUrsaLoggerOption } from './type/loggeroption.t';

export default (ursa: Ursa, options: TUrsaLoggerOption) => {
    const logger = UrsaLogger.instance({
        level: 'ALL',
        consoleLevel: 'ALL',
        allowDebugAtProd: true,
        encoding: 'utf-8',
        outputJSON: true,
        file: path.join(ursa.options.ROOT, '../logger/logger.log'), // 日志默认和src同级
        ...options,
    });

    ursa.app.use((ctx: any, next) => {
        ctx.logger = new ContextLogger(ctx, logger);

        return next();
    });
};

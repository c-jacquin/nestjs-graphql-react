import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import {
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
  WinstonModule,
} from 'nest-winston';
import { Logger } from 'winston';

import { NodeEnv } from '@app/common';
import { AuthFilter } from '@auth/auth.filter';
import { AppModule } from 'app.module';
import { rawConfig } from 'config/logger';
import { AllExceptionsFilter } from 'error.filter';
import { Env } from 'shared';

(async () => {
  let logger: Logger;

  try {
    const app = await NestFactory.create(AppModule, {
      logger:
        process.env[Env.NODE_ENV] !== NodeEnv.PROD &&
        process.env[Env.NODE_ENV] !== NodeEnv.TEST
          ? WinstonModule.createLogger(rawConfig)
          : false,
    });
    const config = app.get<ConfigService>(ConfigService);
    const authFilter = app.get(AuthFilter);
    const errorFilter = app.get(AllExceptionsFilter);
    logger = app.get<Logger>(WINSTON_MODULE_PROVIDER);

    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    app.useGlobalFilters(errorFilter, authFilter);
    app.use(helmet());
    app.enableCors();

    await app.listen(config.get(Env.PORT), config.get(Env.HOST), () => {
      logger.info(`Graphql api is listening on port ${config.get(Env.PORT)}`);
    });
  } catch (err) {
    logger.warn('Something fail while bootstraping :(');
    logger.error(err.message);
    logger.error(err.stack);
  }
})();

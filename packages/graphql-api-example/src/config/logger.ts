import { LoggingWinston as gcpWinstonTransport } from '@google-cloud/logging-winston';
import { registerAs } from '@nestjs/config';
import { utilities as nestWinstonUtils } from 'nest-winston';

import winston from 'winston';

import { NodeEnv, LogLvl, Env } from 'shared';

const winstonTransport: any[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      nestWinstonUtils.format.nestLike(),
    ),
  }),
]

if (process.env.NODE_ENV === NodeEnv.PROD)
  winstonTransport.push(gcpWinstonTransport);

export const rawConfig = {
  level: LogLvl[process.env[Env.NODE_ENV]],
  transports: winstonTransport
};

export default registerAs('logger', () => rawConfig);

// import { LoggingWinston as gcpWinstonTransport } from '@google-cloud/logging-winston';
import { registerAs } from '@nestjs/config';
import { utilities as nestWinstonUtils } from 'nest-winston';

import winston, { LoggerOptions } from 'winston';

import { NodeEnv } from '@app/common';
import { Env } from 'shared';

type LogLvl =
  | 'error'
  | 'warn'
  | 'info'
  | 'http'
  | 'verbose'
  | 'debug'
  | 'silly';

export const LogLvl: Record<NodeEnv, LogLvl> = {
  [NodeEnv.STAGING]: 'warn',
  [NodeEnv.PROD]: 'verbose',
  [NodeEnv.DEV]: 'info',
  [NodeEnv.TEST]: 'error',
  [NodeEnv.LOCAL]: 'info',
};

const winstonTransport: any[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      nestWinstonUtils.format.nestLike(),
    ),
  }),
];

// if (process.env.NODE_ENV === NodeEnv.PROD)
//   winstonTransport.push(gcpWinstonTransport);

export const rawConfig: LoggerOptions = {
  level: LogLvl[process.env[Env.NODE_ENV]],
  transports: winstonTransport,
};

export default registerAs('logger', () => rawConfig);

// import { LoggingWinston as gcpWinstonTransport } from '@google-cloud/logging-winston';
import { registerAs } from '@nestjs/config';
import { utilities as nestWinstonUtils } from 'nest-winston';

import winston, { LoggerOptions } from 'winston';

import { NodeEnv } from '@app/common';
import { Env } from 'shared';
import { StreamTransportInstance } from 'winston/lib/winston/transports';

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
  [NodeEnv.PROD]: 'error',
  [NodeEnv.DEV]: 'info',
  [NodeEnv.TEST]: 'error',
  [NodeEnv.LOCAL]: 'info',
};

const winstonTransport: StreamTransportInstance[] = [
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
  level: process.env[Env.LOG_LVL] || LogLvl[process.env[Env.NODE_ENV]],
  transports: winstonTransport,
};

export default registerAs('logger', () => rawConfig);

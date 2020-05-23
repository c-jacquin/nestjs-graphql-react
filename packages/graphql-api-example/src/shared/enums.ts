export enum Errors {
  ACCESS_TOKEN_MISSING,
  ACCESS_TOKEN_EXPIRED,
  REFRESH_TOKEN,
}

export enum HttpHeaders {
  X_REFRESH_TOKEN = 'x-refresh-token',
  X_ACCESS_TOKEN = 'x-access-token',
  AUTHORIZATION = 'Authorization',
}

export enum NodeEnv {
  DEV = 'development',
  STAGING = 'staging',
  PROD = 'production',
  TEST = 'test',
  DEBUG = 'debug',
}

export enum Env {
  HOST = 'HOST',
  PORT = 'PORT',
  NODE_ENV = 'NODE_ENV',
  JWT_SECRET = 'JWT_SECRET',
  REFRESH_TOKEN_DURATION = 'REFRESH_TOKEN_DURATION',
  ACCESS_TOKEN_DURATION = 'ACCESS_TOKEN_DURATION',
}

export enum Roles {
  ADMIN = 'ADMIN',
  NORMAL = 'NORMAL',
}

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
  [NodeEnv.DEBUG]: 'debug',
};

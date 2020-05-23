export enum Errors {
  ACCESS_TOKEN,
  REFRESH_TOKEN
}

export enum HttpHeaders {
  X_REFRESH_TOKEN = 'x-refresh-token',
  X_ACCESS_TOKEN = 'x-access-token',
  AUTHORIZATION = 'Authorization'
}

export enum NodeEnv {
  DEV = 'development',
  STAGING = 'staging',
  PROD = 'production',
  TEST = 'test',
  DEBUG = 'true',
}

export enum Env {
  HOST = 'HOST',
  PORT = 'PORT',
  NODE_ENV = 'NODE_ENV',
  JWT_SECRET = 'JWT_SECRET',
  REFRESH_TOKEN_DURATION = 'REFRESH_TOKEN_DURATION',
  ACCESS_TOKEN_DURATION = 'ACCESS_TOKEN_DURATION',
}
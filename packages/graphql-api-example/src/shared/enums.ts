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
  LOCAL = 'local',
  DEV = 'development',
  STAGING = 'staging',
  PROD = 'production',
  TEST = 'test',
}

export enum Env {
  DEBUG = 'true',
  HOST = 'HOST',
  PORT = 'PORT',
  NODE_ENV = 'NODE_ENV',
  JWT_SECRET = 'JWT_SECRET',
  REFRESH_TOKEN_DURATION = 'REFRESH_TOKEN_DURATION',
  ACCESS_TOKEN_DURATION = 'ACCESS_TOKEN_DURATION',
  ADMIN_EMAIL = 'ADMIN_EMAIL',
  ADMIN_PASS = 'ADMIN_PASS',
  PG_USER = 'PG_USER',
  PG_PASS = 'PG_PASS',
  PG_DB = 'PG_DB',
  PG_HOST = 'PG_HOST',
  PG_PORT = 'PG_PORT',
}

export enum Roles {
  ADMIN = 'ADMIN',
  NORMAL = 'NORMAL',
}

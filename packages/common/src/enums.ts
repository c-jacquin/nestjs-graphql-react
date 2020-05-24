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

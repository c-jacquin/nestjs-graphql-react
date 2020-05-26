import Joi from '@hapi/joi';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

import { NodeEnv } from '@app/common';
import { Env } from 'shared';
import graphqlConfig from 'config/graphql';
import loggerConfig, { LogLvl } from 'config/logger';
import typeormConfig from 'config/typeorm';
import jwtConfig from 'config/jwt';

export const configSchema = Joi.object({
  [Env.NODE_ENV]: Joi.string()
    .valid(...Object.values(NodeEnv))
    .required(),
  [Env.HOST]: Joi.string().default('0.0.0.0'),
  [Env.PORT]: Joi.number().required(),
  [Env.LOG_LVL]: Joi.string().default(LogLvl[process.env[Env.NODE_ENV]]),
  [Env.JWT_SECRET]: Joi.string().required(),
  [Env.ACCESS_TOKEN_DURATION]: Joi.string().default('360s'),
  [Env.REFRESH_TOKEN_DURATION]: Joi.string().default('360d'),
  [Env.ADMIN_EMAIL]: Joi.string()
    .email()
    .required(),
  [Env.ADMIN_PASS]: Joi.string().required(),
  [Env.POSTGRES_DB]: Joi.string().required(),
  [Env.POSTGRES_HOST]: Joi.string().required(),
  [Env.POSTGRES_PASSWORD]: Joi.string().required(),
  [Env.POSTGRES_PORT]: Joi.number().required(),
  [Env.POSTGRES_USER]: Joi.string().required(),
});

const currentEnv = process.env[Env.NODE_ENV] as NodeEnv;
const envWithEnvFiles = [NodeEnv.TEST, NodeEnv.DEV];

const rawOptions: ConfigModuleOptions = {
  isGlobal: true,
  ignoreEnvFile: envWithEnvFiles.includes(currentEnv),
  validationSchema: configSchema,
  load: [graphqlConfig, loggerConfig, typeormConfig, jwtConfig],
  envFilePath: [`.env.${currentEnv}`, `.database.${currentEnv}.env`],
};

export default rawOptions;

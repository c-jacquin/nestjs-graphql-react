import Joi from '@hapi/joi';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

import { Env, NodeEnv } from 'shared';
import graphqlConfig from 'config/graphql';
import loggerConfig from 'config/logger';
import typeormConfig from 'config/typeorm';
import jwtConfig from 'config/jwt';

export const configSchema = Joi.object({
  [Env.NODE_ENV]: Joi.string()
    .valid(...Object.values(NodeEnv))
    .required(),
  [Env.JWT_SECRET]: Joi.string().required(),
  [Env.HOST]: Joi.string().default('0.0.0.0'),
  [Env.PORT]: Joi.number().default(3000),
  [Env.ACCESS_TOKEN_DURATION]: Joi.string().default('360s'),
  [Env.REFRESH_TOKEN_DURATION]: Joi.string().default('360d'),
  [Env.ADMIN_EMAIL]: Joi.string()
    .email()
    .required(),
  [Env.ADMIN_PASS]: Joi.string().required(),
  [Env.PG_DB]: Joi.alternatives().conditional(Env.NODE_ENV, {
    not: NodeEnv.LOCAL,
    then: Joi.string().required(),
  }),
  [Env.HOST]: Joi.alternatives().conditional(Env.NODE_ENV, {
    not: NodeEnv.LOCAL,
    then: Joi.string().required(),
  }),
  [Env.PG_PASS]: Joi.alternatives().conditional(Env.NODE_ENV, {
    not: NodeEnv.LOCAL,
    then: Joi.string().required(),
  }),
  [Env.PG_PORT]: Joi.alternatives().conditional(Env.NODE_ENV, {
    not: NodeEnv.LOCAL,
    then: Joi.number().required(),
  }),
  [Env.PG_USER]: Joi.alternatives().conditional(Env.NODE_ENV, {
    not: NodeEnv.LOCAL,
    then: Joi.string().required(),
  }),
});

const rawOptions: ConfigModuleOptions = {
  isGlobal: true,
  ignoreEnvFile: process.env[Env.NODE_ENV] !== NodeEnv.LOCAL,
  validationSchema: configSchema,
  load: [graphqlConfig, loggerConfig, typeormConfig, jwtConfig],
};

export default rawOptions;

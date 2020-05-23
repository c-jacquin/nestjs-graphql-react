import Joi from '@hapi/joi';

import { Env, NodeEnv } from 'shared';
import graphqlConfig from 'config/graphql';
import loggerConfig from 'config/logger';
import typeormConfig from 'config/typeorm';
import jwtConfig from 'config/jwt';

export const configSchema = Joi.object({
  [Env.NODE_ENV]: Joi.string()
    .valid(...Object.values(NodeEnv))
    .required(),
  [Env.PORT]: Joi.number().required(),
  [Env.JWT_SECRET]: Joi.string().required(),
  [Env.HOST]: Joi.string().default('0.0.0.0'),
  [Env.ACCESS_TOKEN_DURATION]: Joi.string(),
  [Env.REFRESH_TOKEN_DURATION]: Joi.string(),
});

export default {
  isGlobal: true,
  ignoreEnvFile: process.env.NODE_ENV === NodeEnv.PROD,
  validationSchema: configSchema,
  load: [graphqlConfig, loggerConfig, typeormConfig, jwtConfig],
};

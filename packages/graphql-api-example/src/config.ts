import Joi from '@hapi/joi';

import { Env, NodeEnv } from '@shared';

export const configSchema = Joi.object({
  [Env.NODE_ENV]: Joi.string()
    .valid(...Object.values(NodeEnv))
    .default(NodeEnv.DEV),
  [Env.HOST]: Joi.string()
    .default('0.0.0.0'),
  [Env.PORT]: Joi.number().default(3000),
  [Env.JWT_SECRET]: Joi.string().default('mySecret'),
  [Env.ACCESS_TOKEN_DURATION]: Joi.string().default('360sec'),
  [Env.REFRESH_TOKEN_DURATION]: Joi.string().default('360d'),
});

import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

import { Env } from 'shared';

export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env[Env.JWT_SECRET],
    signOptions: {
      expiresIn: process.env[Env.ACCESS_TOKEN_DURATION],
    },
  }),
);

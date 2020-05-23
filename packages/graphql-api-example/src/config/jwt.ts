import { registerAs } from '@nestjs/config';

import { Env } from 'shared';

export default registerAs('jwt', () => ({
  secret: process.env[Env.JWT_SECRET],
  signOptions: {
    expiresIn: process.env[Env.ACCESS_TOKEN_DURATION],
  },
}));

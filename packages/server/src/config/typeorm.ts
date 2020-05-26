import { registerAs } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';

import { Env } from 'shared';

export default registerAs(
  'typeorm',
  (): ConnectionOptions => ({
    type: 'postgres',
    host: process.env[Env.POSTGRES_HOST],
    port: parseInt(process.env[Env.POSTGRES_HOST]),
    username: process.env[Env.POSTGRES_USER],
    password: process.env[Env.POSTGRES_PASSWORD],
    database: process.env[Env.POSTGRES_DB],
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    logging: process.env[Env.DEBUG] === 'true',
  }),
);

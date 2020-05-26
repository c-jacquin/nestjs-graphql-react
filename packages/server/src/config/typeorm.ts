import { registerAs } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';

import { NodeEnv } from '@app/common';
import { Env } from 'shared';

const IS_LOCAL = process.env[Env.NODE_ENV] === NodeEnv.LOCAL;

const sqliteCpnfig: ConnectionOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
};

const postgreConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env[Env.PG_HOST],
  port: parseInt(process.env[Env.PG_PORT]),
  username: process.env[Env.PG_USER],
  password: process.env[Env.PG_PASS],
  database: process.env[Env.PG_DB],
};

export default registerAs(
  'typeorm',
  (): ConnectionOptions => ({
    ...(IS_LOCAL ? sqliteCpnfig : postgreConfig),
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    logging: process.env[Env.DEBUG] === 'true',
  }),
);

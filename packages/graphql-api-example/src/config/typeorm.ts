import { registerAs } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';

export default registerAs(
  'typeorm',
  (): ConnectionOptions => ({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    logging: false,
  }),
);

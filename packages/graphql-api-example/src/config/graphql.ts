import { registerAs } from '@nestjs/config';
import { GqlModuleOptions } from '@nestjs/graphql';
import path from 'path';

import { IContext } from 'shared';

export default registerAs(
  'graphql',
  (): GqlModuleOptions => ({
    autoSchemaFile: path.resolve(process.cwd(), 'schema.gql'),
    debug: Boolean(process.env.DEBUG),
    context: ({ req }): IContext => ({ req, res: req.res }),
  }),
);

import { registerAs } from '@nestjs/config';
import path from 'path';

import { IContext } from 'shared';

export default registerAs('graphql', () => ({
  autoSchemaFile: path.resolve(process.cwd(), 'schema.gql'),
  debug: !!process.env.DEBUG,
  context: ({ req }): IContext => ({ req, res: req.res }),
}));

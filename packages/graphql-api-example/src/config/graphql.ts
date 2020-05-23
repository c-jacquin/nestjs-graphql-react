import { registerAs } from '@nestjs/config';
import { IContext } from '@shared';

export default registerAs('graphql', () => ({
  autoSchemaFile: 'schema.gql',
  debug: !!process.env.DEBUG,
  context: ({ req }): IContext => ({ req, res: req.res }),
}));

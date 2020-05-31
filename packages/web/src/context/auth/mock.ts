import { createMock } from 'ts-auto-mock';
import { Logger } from 'winston';

import { AuthDependencies } from './';
import { IStorage, AppApolloClient } from '../../core/dependencies';

export const authMockDepencies: AuthDependencies = {
  apolloClient: createMock<AppApolloClient>(),
  logger: createMock<Logger>(),
  session: createMock<IStorage>(),
  storage: createMock<IStorage>(),
};

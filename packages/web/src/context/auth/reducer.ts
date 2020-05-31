import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { Logger } from 'winston';

import { StorageKey } from '../../config/enums';
import createLogger, { Loggers } from '../../config/logger';
import { IStorage } from '../../core/dependencies';
import { Action, Reducer } from '../type';

export interface AuthState {
  accessToken?: string;
  refreshToken?: string;
}
export enum AuthActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}
export type AuthAction = Action<AuthActionType, Partial<AuthState>>;
export type AuthDispatch = (action: AuthAction) => void;

export interface AuthDependencies {
  logger: Logger;
  storage: IStorage;
  session: IStorage;
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

const authLogger = createLogger(Loggers.AUTH);

const authReducer: Reducer<AuthState, AuthAction, AuthDependencies> = ({
  session,
  storage,
  apolloClient,
}) => (state, action) => {
  authLogger.info('action ==> ', action.type, action.payload);

  switch (action.type) {
    case AuthActionType.LOGIN: {
      storage.setItem(StorageKey.ACCESS_TOKEN, action.payload.accessToken);
      session.setItem(StorageKey.REFRESH_TOKEN, action.payload.refreshToken);

      return {
        ...state,
        ...action.payload,
      };
    }

    case AuthActionType.LOGOUT: {
      storage.removeItem(StorageKey.ACCESS_TOKEN);
      session.removeItem(StorageKey.REFRESH_TOKEN);
      apolloClient.clearStore();

      return {};
    }

    default: {
      throw new Error(`auth reducer => Unhandled action type: ${action.type}`);
    }
  }
};

export default authReducer;

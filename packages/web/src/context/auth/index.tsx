import React from 'react';

import authReducer, {
  AuthDispatch,
  AuthState,
  AuthActionType,
  AuthAction,
  AuthDependencies,
} from './reducer';
import { StorageKey } from '../../config/enums';
import useLogger from '../../hooks/logger';
import { Loggers } from '../../config/logger';

const AuthStateContext = React.createContext<AuthState | undefined>(undefined);

const AuthDispatchContext = React.createContext<AuthDispatch | undefined>(
  undefined,
);

interface AuthProviderProps {
  dependencies: Omit<AuthDependencies, 'logger'>;
}

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  dependencies: { session, storage, apolloClient },
}) => {
  const logger = useLogger(Loggers.AUTH);
  const [state, dispatch] = React.useReducer(
    authReducer({ session, storage, logger, apolloClient }),
    {
      accessToken: storage.getItem(StorageKey.ACCESS_TOKEN),
      refreshToken: session.getItem(StorageKey.REFRESH_TOKEN),
    },
  );

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

function useAuthState() {
  const context = React.useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }

  return context;
}

function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);

  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a AuthProvider');
  }

  return context;
}

function useAuth() {
  return {
    authState: useAuthState(),
    dispatch: useAuthDispatch(),
  };
}

export {
  AuthProvider,
  useAuth,
  AuthState,
  AuthDispatch,
  AuthActionType,
  AuthAction,
};
import 'react-toastify/dist/ReactToastify.css';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'theme-ui';

import { Routes } from './config/enums';
import { AuthProvider } from './context/auth';
import Layout from './pages/app';
import LoginPage from './pages/login';
import theme from './styles/theme';

export interface AppDependencies {
  storage: Storage;
  session: Storage;
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

const App: React.FC<AppDependencies> = ({ ...dependencies }) => {
  return (
    <ApolloProvider client={dependencies.apolloClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider dependencies={dependencies}>
          <BrowserRouter>
            <Switch>
              <Route path={Routes.LOGIN} component={LoginPage} />
              <Route path={Routes.ROOT} component={Layout} />
            </Switch>
          </BrowserRouter>
        </AuthProvider>
        <ToastContainer />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;

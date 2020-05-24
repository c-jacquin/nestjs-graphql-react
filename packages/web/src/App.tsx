import { ApolloProvider } from '@apollo/react-hooks';
import preset from '@rebass/preset';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Routes } from './config/routes';
import client from './graphql/apollo';
import Layout from './pages';
import LoginPage from './pages/login';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={preset}>
        <BrowserRouter>
          <Switch>
            <Route path={Routes.LOGIN} component={LoginPage} />
            <Route path={Routes.ROOT} component={Layout} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;

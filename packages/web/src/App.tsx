import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { Router } from 'react-router';

import { AuthProvider } from './context/auth';
import { AppDependencies } from './core/dependencies';
import Layout from './pages/layout';

const App: React.FC<AppDependencies> = ({ history, ...dependencies }) => {
  return (
    <ApolloProvider client={dependencies.apolloClient}>
      <AuthProvider dependencies={dependencies}>
        <Router history={history}>
          <Layout />
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;

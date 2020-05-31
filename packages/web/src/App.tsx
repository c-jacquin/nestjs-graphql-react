import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { Router } from 'react-router';

import { AuthProvider } from './context/auth';
import { AppDependencies } from './core/dependencies';
import Layout from './pages/layout';

const App: React.FC<AppDependencies> = ({ ...dependencies }) => {
  return (
    <ApolloProvider client={dependencies.apolloClient}>
      <Router history={dependencies.history}>
        <AuthProvider dependencies={dependencies}>
          <Layout />
        </AuthProvider>
      </Router>
    </ApolloProvider>
  );
};

export default App;

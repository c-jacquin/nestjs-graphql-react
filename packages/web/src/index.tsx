import 'setimmediate';
import React from 'react';
import ReactDOM from 'react-dom';

import App, { AppDependencies } from './App';
import createLogger, { Loggers } from './config/logger';
import configureApollo from './graphql/apollo';

const dependencies: AppDependencies = {
  storage: localStorage,
  session: sessionStorage,
  apolloClient: configureApollo({
    storage: localStorage,
    session: sessionStorage,
    logger: createLogger(Loggers.GRAPHQL),
  }),
};

ReactDOM.render(
  <App {...dependencies} />,
  document.getElementById('react-app'),
);

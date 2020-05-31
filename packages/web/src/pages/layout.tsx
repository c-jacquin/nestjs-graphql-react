import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { Switch, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'theme-ui';

import GlobalStyle from '../styles/global';
import theme from '../styles/theme';
import { Routes } from '../config/enums';
import LoginPage from './login';
import RootPage from './root';

const Layout: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Switch>
      <Route path={Routes.LOGIN} component={LoginPage} />
      <Route exact path={Routes.ROOT} component={RootPage} />
    </Switch>
    <ToastContainer />
  </ThemeProvider>
);

export default Layout;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Box } from 'rebass';

import Header from '../components/header';
import { Routes } from '../config/routes';
import HomePage from './home';

const Layout: React.FC = () => (
  <Box>
    <Header title="My App" />
    <Box style={{ padding: '0 50px' }}>
      <Switch>
        <Route exact path={Routes.ROOT} component={HomePage} />
      </Switch>
    </Box>
    <Box>Footer</Box>
  </Box>
);

export default Layout;

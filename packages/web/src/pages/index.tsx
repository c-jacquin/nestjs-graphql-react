import { useQuery } from '@apollo/react-hooks';
import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box } from 'rebass';

import Header from '../components/header';
import { useAuth } from '../context/auth';
import { Routes } from '../config/enums';
import HomePage from './home';
import WHO_AM_I_QUERY from './whoAmI.graphql';

const Layout: React.FC = () => {
  const { data, loading, error } = useQuery(WHO_AM_I_QUERY);
  const { authState } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (error && !data) {
      history.replace(Routes.LOGIN);
      toast.warn('You need to authenticate before continue');
    }
  }, [error, data, history]);

  useEffect(() => {
    if (!authState.accessToken) history.push(Routes.LOGIN);
  }, [authState.accessToken, history]);

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
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
};

export default Layout;

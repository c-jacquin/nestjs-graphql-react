import { useQuery } from '@apollo/react-hooks';
import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box } from 'theme-ui';

import { WHO_AM_I_QUERY } from '@app/common';
import Header from '../../components/header';
import { Routes } from '../../config/enums';
import HomePage from './home';

const RootPage: React.FC = () => {
  const { loading, error } = useQuery(WHO_AM_I_QUERY);
  const history = useHistory();

  useEffect(() => {
    if (error) {
      history.replace(Routes.LOGIN);
      toast.warn('You need to authenticate before continue');
    }
  }, [error, history]);

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

export default RootPage;

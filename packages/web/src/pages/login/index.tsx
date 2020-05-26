import { useMutation, useQuery } from '@apollo/react-hooks';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box } from 'rebass';

import { useAuth, AuthActionType } from '../../context/auth';
import { Routes } from '../../config/enums';
import WHO_AM_I_QUERY from '../whoAmI.graphql';

import LOGIN_MUTATION from './login.graphql';
import LoginForm from './components/login-form';

const LoginPage: React.FC = () => {
  const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION);
  const queryResult = useQuery(WHO_AM_I_QUERY);
  const { dispatch } = useAuth();
  const history = useHistory();

  // Handle login
  useEffect(() => {
    if (!error && data) {
      dispatch({
        type: AuthActionType.LOGIN,
        payload: {
          accessToken: data.login.accessToken,
          refreshToken: data.login.refreshToken,
        },
      });
      history.replace(Routes.ROOT);
    }

    if (error) {
      toast.error('Something fail while trying to login');
    }
  }, [data, error, history, dispatch]);

  // Check if user is already logged in
  useEffect(() => {
    if (queryResult.data && queryResult.data.whoAmI) {
      history.replace(Routes.ROOT);
    }
  }, [queryResult.data, history]);

  return (
    <Box
      sx={{
        height: '100%',
        maxWidth: 512,
        mx: 'auto',
        px: 3,
      }}
    >
      <Box px={2} bg="black" />
      <LoginForm onSubmit={login} loading={loading} />
    </Box>
  );
};

export default LoginPage;

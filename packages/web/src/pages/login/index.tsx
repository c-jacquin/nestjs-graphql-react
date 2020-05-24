import { useMutation } from '@apollo/react-hooks';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from 'rebass';

import { Routes } from '../../config/routes';
import LOGIN_MUTATION from './login.graphql';
import LoginForm, { LoginFormValue } from './components/login-form';

const LoginPage: React.FC = () => {
  const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION);
  const history = useHistory();
  const onSubmit = useCallback(
    async (variables: LoginFormValue) => {
      await login({ variables });

      if (!error && data) {
        localStorage.setItem('access_token', data.login.accessToken);
        sessionStorage.setItem('refresh_token', data.login.refreshToken);
        history.replace(Routes.ROOT);
      }

      if (error) {
        console.error(error);
      }
    },
    [login, error, history, data],
  );

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
      <LoginForm onSubmit={onSubmit} loading={loading} />
    </Box>
  );
};

export default LoginPage;

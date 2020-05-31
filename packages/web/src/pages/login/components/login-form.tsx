import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Label, Input, Alert, Spinner, Flex } from 'theme-ui';

import { emailRegExp, passwordRegExp } from '@app/common';

export interface LoginFormValue {
  email: string;
  password: string;
}

export interface LoginFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: ({ variables: LoginFormValue }) => void | Promise<any>;
  loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ loading, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <Box
      title="login-form"
      as="form"
      onSubmit={handleSubmit((variables) => onSubmit({ variables }))}
      py={3}
    >
      <Box px={2} mt={2}>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          ref={register({
            required: 'Email isrequired !',
            pattern: emailRegExp,
          })}
        />
        {errors.email && <Alert>{errors.email.message}</Alert>}
      </Box>
      <Box px={2} mt={2}>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          ref={register({
            required: 'password is required',
            pattern: passwordRegExp,
          })}
        />
        {errors.password && <Alert>{errors.password.message}</Alert>}
      </Box>
      <Flex
        px={2}
        mt={2}
        sx={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Button
          sx={{
            width: '100px',
          }}
        >
          {loading ? <Spinner size={12} /> : 'submit'}
        </Button>
      </Flex>
    </Box>
  );
};

export default LoginForm;

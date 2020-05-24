import { Button, Box } from 'rebass';
import { Label, Input } from '@rebass/forms';
import React from 'react';
import { useForm } from 'react-hook-form';

// import { emailRegExp } from '@app/common';

export type LoginFormValue = {
  email: string;
  password: string;
};

export interface LoginFormProps {
  onSubmit: (formValue: LoginFormValue) => void;
  loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ loading, onSubmit }) => {
  const { register, errors, handleSubmit } = useForm();

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} py={3}>
      <Box width={1 / 2} px={2}>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          ref={register({
            required: 'Enter your email !',
            // pattern: emailRegExp,
          })}
        />
      </Box>
      <Box width={1 / 2} px={2}>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          ref={register({ required: 'password is required' })}
        />
      </Box>
      <Box px={2} ml="auto">
        <Button>{loading ? 'loading...' : 'submit'}</Button>
      </Box>
    </Box>
  );
};

export default LoginForm;

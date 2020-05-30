import gql from 'graphql-tag';

const { loc } = gql`
  mutation($password: String!, $newPassword: String!) {
    resetPassword(password: $password, newPassword: $newPassword)
  }
`;

export const resetPasswordMutation = loc.source.body;

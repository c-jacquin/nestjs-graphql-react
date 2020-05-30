import gql from 'graphql-tag';

const { loc } = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export const loginMutation = loc.source.body;

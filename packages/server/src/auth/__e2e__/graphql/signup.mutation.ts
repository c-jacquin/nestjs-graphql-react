import gql from 'graphql-tag';

const { loc } = gql`
  mutation($email: Email!, $password: String!) {
    signup(email: $email, password: $password)
  }
`;

export const signupMutation = loc.source.body;

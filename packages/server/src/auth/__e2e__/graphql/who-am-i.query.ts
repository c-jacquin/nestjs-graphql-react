import gql from 'graphql-tag';

const { loc } = gql`
  query whoAmI {
    whoAmI {
      id
      email
      roles
    }
  }
`;

export const whoAmIQuery = loc.source.body;

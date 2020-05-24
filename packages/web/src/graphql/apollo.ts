import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { HttpHeaders } from '@app/common';

const httpLink = createHttpLink({
  uri: `${process.env.GQL_API_BASE_URL}:${process.env.GQL_API_PORT}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = sessionStorage.getItem('refresh_token');

  console.log('=========================');
  console.log(accessToken, refreshToken);
  console.log('=========================');

  return {
    headers: {
      ...headers,
      [HttpHeaders.AUTHORIZATION]: accessToken ? `Bearer ${accessToken}` : '',
      [HttpHeaders.X_REFRESH_TOKEN]: refreshToken,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

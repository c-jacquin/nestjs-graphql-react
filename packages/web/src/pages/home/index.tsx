import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import TODO_LIST_QUERY from './todo-list.graphql';

const HomePage: React.FC = () => {
  const { loading } = useQuery(TODO_LIST_QUERY, { variables: {} });

  if (loading) return <span>loading...</span>;

  return <div>Hello World</div>;
};

export default HomePage;

import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import TODO_LIST_QUERY from './todo-list.graphql';

const HomePage: React.FC = () => {
  const { loading, error, data } = useQuery(TODO_LIST_QUERY, { variables: {} });

  if (loading) return <span>loading...</span>;

  console.log(data, error, loading);

  return <div>Hello World</div>;
};

export default HomePage;

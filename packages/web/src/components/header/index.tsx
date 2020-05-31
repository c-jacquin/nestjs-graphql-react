import { Box, Button, Flex, Text } from 'theme-ui';
import React from 'react';

import { AuthActionType, useAuth } from '../../context/auth';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { dispatch } = useAuth();

  return (
    <Flex px={2} color="white" bg="black">
      <Text p={2}>{title}</Text>
      <Box mx="auto" />
      <Button
        onClick={() =>
          dispatch({
            type: AuthActionType.LOGOUT,
          })
        }
      >
        Logout
      </Button>
    </Flex>
  );
};

export default Header;

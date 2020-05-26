import { Flex, Text, Box, Button } from 'rebass';
import React from 'react';

import { useAuth, AuthActionType } from '../../context/auth';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { dispatch } = useAuth();

  return (
    <Flex px={2} color="white" bg="black" alignItems="center">
      <Text p={2} fontWeight="bold">
        {title}
      </Text>
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

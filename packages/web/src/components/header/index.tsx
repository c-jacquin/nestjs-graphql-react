import { Flex, Text, Box, Link } from 'rebass';
import React from 'react';
import { useHistory } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const history = useHistory();

  return (
    <Flex px={2} color="white" bg="black" alignItems="center">
      <Text p={2} fontWeight="bold">
        {title}
      </Text>
      <Box mx="auto" />
      <Link variant="nav" href="#!">
        Profile
      </Link>
    </Flex>
  );
};

export default Header;

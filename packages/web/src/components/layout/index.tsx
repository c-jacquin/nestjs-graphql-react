import { Box, Container } from 'theme-ui';
import React from 'react';

import { useAside } from '../../context/aside';
import Aside from './aside';
import Header from './header';

export interface LayoutProps {
  aside?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ aside, children }) => {
  const { asideState } = useAside();

  return (
    <Box sx={{ variant: 'layout' }}>
      <Header title="My app" />
      <Box sx={{ variant: 'layout.main' }}>
        {aside && (
          <Aside
            animate={asideState.isOpen ? 'open' : 'closed'}
            variants={{
              open: { opacity: 1, x: 0 },
              closed: { opacity: 0, x: '-100%' },
            }}
          />
        )}
        <Container as="main">{children}</Container>
      </Box>
      <Box as="footer" sx={{ variant: 'layout.footer' }}>
        <Container>Footer</Container>
      </Box>
    </Box>
  );
};

export default Layout;

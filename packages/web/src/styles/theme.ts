// import { Theme } from 'theme-ui';

import baseTheme from './base.theme';

const theme = {
  ...baseTheme,
  alerts: {
    formError: {
      color: 'red',
      bg: 'background',
      border: 'solid 1px red',
      display: 'flex',
      flexDirection: 'column',
    },
  },
};

export default theme;

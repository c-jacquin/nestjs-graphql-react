import React, { ComponentType } from 'react';

export const withProviders = (providers: ComponentType[]) => (
  Component: ComponentType,
) => {
  return providers.reverse().reduce((jsx, Provider) => {
    return <Provider>{jsx}</Provider>;
  }, <Component />);
};

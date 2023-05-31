import { ThemeProvider } from '@emotion/react';
import { render as rtlRender } from '@testing-library/react';
import { PropsWithChildren } from 'react';

import { theme } from '@/theme';

type ArgumentTypes<F> = F extends (...args: infer A) => any ? A : never;

type RenderArgs = ArgumentTypes<typeof rtlRender>;

export const Wrapper = ({ children }: PropsWithChildren<unknown>) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

// eslint-disable-next-line import/export
export * from '@testing-library/react';

// eslint-disable-next-line import/export
export const render = (ui: RenderArgs[0], config?: RenderArgs[1]) => {
  return rtlRender(ui, {
    wrapper: Wrapper,
    ...config,
  });
};

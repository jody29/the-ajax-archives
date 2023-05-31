import { isBrowser } from '@chakra-ui/utils';
import { PropsWithChildren } from 'react';

export function NoSsr({ children }: PropsWithChildren<unknown>) {
  /**
   * to validate whenever your code is running either client side or in node, use typeof window
   * https://github.com/zeit/next.js/pull/7651
   */
  if (!isBrowser) return null;

  return <>{children}</>;
}

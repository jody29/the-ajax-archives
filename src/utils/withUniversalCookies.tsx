import { NextPageContext } from 'next';
import { AppContext, AppProps } from 'next/app';
import { AppType } from 'next/dist/shared/lib/utils';
import { Cookies, CookiesProvider } from 'react-cookie';

import { isBrowser } from './isBrowser';

type WithUniversalCookieProps = AppProps & {
  cookies: Cookies;
};

/**
 * Wraps the app with the CookieProvider from react-cookie (https://github.com/reactivestack/cookies/tree/master/packages/react-cookie)
 *
 * With this it's easy to access both server and client cookies by using the useCookies hook
 *
 * Usage:
 * `const [cookies, setCookie, removeCookie] = useCookies()`
 */
export const withUniversalCookies = (App: AppType) => {
  function getCookies(ctx: NextPageContext) {
    if (ctx && ctx.req && ctx.req.headers.cookie) {
      return new Cookies(ctx.req.headers.cookie);
    }

    return new Cookies();
  }

  const WithUniversalCookies = (props: WithUniversalCookieProps) => {
    const { cookies, ...rest } = props;
    return (
      <CookiesProvider cookies={isBrowser ? undefined : cookies}>
        <App {...rest} />
      </CookiesProvider>
    );
  };

  WithUniversalCookies.getInitialProps = async (appCtx: AppContext) => {
    const { ctx } = appCtx;
    let appProps: any = {};

    if (App.getInitialProps) {
      appProps = await App.getInitialProps(appCtx);
    }

    const cookies = getCookies(ctx);

    return { ...appProps, cookies };
  };

  return WithUniversalCookies;
};

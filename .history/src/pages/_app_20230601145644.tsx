import '@public/fonts/fonts.css';
import 'mapbox-gl/dist/mapbox-gl.css'

import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/dist/shared/lib/router/router';

import { BaseLayout } from '@/components/templates';
import { theme } from '@/theme/theme';
import { isBrowser } from '@/utils/isBrowser';

import { Provider } from '@/components/Provider'

if (isBrowser) {
  import('@/utils/detectTouch');
  import('@/utils/detectKeyboardFocus');
}

const MyApp = ({ Component: Page, pageProps }: AppProps) => {
  if (pageProps.renderWithoutLayout) {
    return <Page {...pageProps} />;
  }

  return (
    <>
      <DefaultSeo titleTemplate={`%s | Dept`} />
      <ChakraProvider theme={theme} resetCSS>
        <Provider>
          <BaseLayout>
            <Page {...pageProps} />
          </BaseLayout>
        </Provider>
      </ChakraProvider>
    </>
  );
};

export default MyApp;

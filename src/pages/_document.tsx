import Document, { Head, Html, Main, NextScript } from 'next/document';

import { renderFavicons } from '@/utils/favicons';

export default class MyDocument extends Document {
  public render() {
    /**
     * Remove lang from <Html> when using https://nextjs.org/docs/advanced-features/i18n-routing
     */
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="disabled-adaptations" content="watch" />
          {renderFavicons()}

          {this.props.dangerousAsPath !== '/unsupported' && (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function() {
                var host = window.location.hostname;
                var ua = window.navigator.userAgent;
                var redirect = '/unsupported';
                // test if browser is  <= IE10
                var msie = ua.indexOf('MSIE');
                if (msie > 0) {
                    window.location.href = redirect;
                }
                // test if browser is IE11
                var trident = ua.indexOf('Trident/');
                if (trident > 0) {
                  window.location.href = redirect;
                }
              })();`,
              }}
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

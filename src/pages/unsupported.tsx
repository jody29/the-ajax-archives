/* eslint-disable @next/next/no-img-element */

import { NextPage, NextPageContext } from 'next';
import { NextSeo } from 'next-seo';

export async function getStaticProps(ctx: NextPageContext) {
  return {
    props: {
      renderWithoutLayout: true,
    },
  };
}

const UnsupportedBrowser: NextPage = () => {
  return (
    <>
      <NextSeo title="Unsupported" description="Your browser is not supported" />

      <div className="wrapper">
        <h1>Browser not supported!</h1>
        <p>
          You are using a browser we do not support. <br />
          Please use one of these browsers to improve your experience.
        </p>

        <ul>
          <li>
            <a href="https://www.google.com/chrome/">
              <div className="logo">
                <img src="/images/chrome.svg" alt="Google Chrome" />
              </div>
              Google Chrome
            </a>
          </li>
          <li>
            <a href="https://www.mozilla.org/firefox/new/">
              <div className="logo">
                <img src="/images/firefox.svg" alt=">Mozilla Firefox" />
              </div>
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a href="https://www.microsoft.com/edge">
              <div className="logo">
                <img src="/images/edge.svg" alt="Microsoft Edge" />
              </div>
              Microsoft Edge
            </a>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .wrapper {
          max-width: 600px;
          margin: 0 auto;
          padding: 15px;
        }

        h1 {
          line-height: 1.2;
        }

        p {
          opacity: 0.8;
          margin-bottom: 2em;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
        }

        li {
          max-width: 200px;
          padding: 20px;
        }

        .logo {
          height: 120px;
          margin-bottom: 10px;
        }

        img {
          transition: transform 0.2s ease-in-out;
          transform: translateY(0) scale(1);
          transform-origin: center bottom;
          width: 100%;
          height: 100%;
        }

        img:hover {
          transform: translateY(-5px) scale(1.05);
        }

        a {
          color: inherit;
          text-decoration: none;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          height: 100%;
        }

        body {
          margin: 0;
          padding: 0;
          background-color: #131313;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif,
            'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
          letter-spacing: 1px;
          text-align: center;
          line-height: 1.5;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default UnsupportedBrowser;

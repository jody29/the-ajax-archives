# Dept React Setup

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Initialize the project

- Copy `.env.example` to `.env` and fill in the required variables
- Run `yarn` to install the dependencies

## To start the server

- Run `yarn dev` to start the dev server
- Run `yarn build && yarn start` to start the production server

## Next.js

This project uses next.js to achieve server side rendering ([https://nextjs.org/docs](https://nextjs.org/docs)). Some of the major differences with client side react applications are _routing_ and _server side data fetching_. Also you have to take in to account that you cannot use browser api on the server. To use browser api you need to wrap them in a condition. For example

```javascript
if (isBrowser) {
  window.addEventListener(fn);
}
```

## Generator

The project includes generators for components en context provider. Simply run one of the following commands:

```bash
# creates a pages/about.tsx
yarn route about
```

```bash
# creates a component in the shared folder
yarn component shared/Slider
```

```bash
# creates a component in the features/login folder
yarn component features/login/LoginForm
```

```bash
# creates a context provider
yarn context User
```

## Custom server

By default, Next will start a server with `next start`. However it's possible to launch Next with a [custom server](https://nextjs.org/docs/advanced-features/custom-server). To switch to the custom server setup remove the `start` and `dev` scripts from `package.json` and rename `start:custom-server` and `dev:custom-server` to `start` and `dev`. The custom server is located at `./server/server.ts`. If you think you do not need it you can delete it.

## Generate icons from svg

Place all your icons in `/src/icons`. Run `yarn svgr`. This generates jsx components from your svg's and optimizes them with SVGO. SVGO config is located in the root of the project. The CamelCased filename will be the name of the icon.

Example:

calendar.svg -> Calendar.tsx

Usage:

`<CalendarIcon color="magenta" size={20} />`

Or choose one of the awesome free iconsets from [https://react-icons.github.io/react-icons/](https://react-icons.github.io/react-icons/) (already included)

```
import { FaBeer } from 'react-icons/fa';

<FaBeer size={20} />
```

## Generate favicons / app icons

To generate the favicons:

- Overwrite `/public/logo.png`. Make sure the resolution is as big as possible.
- Define the configuration in `/config/favicons.js`
- Run `yarn favicons`
- The meta tags are automatically inserted in `_documents.tsx`

### Routing

To create a new route add a new page to the `./pages` folder. You can easily create a new page by running `yarn route name-of-the-page`. Your newly created page will server from `http://localhost:3000/name-of-the-page`. Because the filename will be the same as the slug name has to be in kebab-case [http://wiki.c2.com/?KebabCase](http://wiki.c2.com/?KebabCase). If you need the page to be dynamic, create a page with brackets. For example: `product/[productId].tsx`. `http://localhost:3000/product/100` will serve the page with `{ productId: '100' }` in its `ctx.query` object. More info [https://github.com/zeit/next.js#dynamic-routing](https://github.com/zeit/next.js#dynamic-routing)

1. Create new page with `yarn route about`
2. Serve the page from `http://localhost:3000/about`

## Typescript

This project is written to typescript. If you aren't that familiar with typescript this [cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet) is a great resource to get familiar.

## Opt out of Server Side Rendering

If you would like to create a static website and opt out of SSR thats also possible. Make sure non of your pages use the `getInitialProps` or the `getServerSideProps` functions. Also make sure you dont have any api routes (routes in the `/api` folder), because they will not work without the server. Run `yarn build` && `yarn export`. This will generate the `out` folder, which includes all the static files. Upload the out folder to your server and make sure all traffic is pointed to `index.html`. Check out the documentation for static pages and `getStaticProps` for dynamic pages ([https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)).

To test:

1. Go to the `out` folder `cd out`
2. Run a http server `npx http-server`

## Documentation

Documentation for this project is present in storybook. Run `yarn storybook` to start up the documentation.

## Design system

This project uses [emotion](https://emotion.sh/docs/introduction) and [chakra-ui](https://www.npmjs.com/package/@chakra-ui/react) to create the ui library, but use of _css_, _css modules_ and _sass_ are still supported.

## Using / overriding Chakra components

Any overriden Chakra components should be added in the `src/themes/components` directory. Also make sure to add the component in the object in `index.ts`, with the correct component name.

### Structuring the Chakra component file
In order to know how to structure the component file, it's best to look at the [Chakra Docs for the component](https://chakra-ui.com/docs/data-display/divider) and click on the ["View theme source" button](https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/divider.ts) on the top of the page.

In general you will see an object with a few properties being exported:
* **baseStyle**: Being any styles applied to all components
* **defaultProps**: Any chakra props that should be set by default (eg `variant` or `backgroundColor`)
* **variants**: A key value object with all variants as the key, and the object being the style for that variant (see the button in this repository as an example)
* **sizes**: A key value object with all sizes as the key, and the object being the style for that size.

### Note on component with different parts
Sometimes you might come across a component which has multiple parts, for example [the `List` component](https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/list.ts). You will recognize these components by the `parts` property. For the `List` component these parts are `container`, `item` and `icon`. The only thing you should know is that for these type of components, you need to reference the part as well. For `baseStyle` this is the first level of the object, for `variants` and `sizes` this is nested inside the variant/size name. Like so:

```js
{
  baseStyle: {
    container: {
      background: 'blue'
    }
  },
  variants: {
    striped: {
      container: {
        borderTop: '1px dashed hotpink'
      }
    }
  }
}
```

## Using NextJS on Windows
A web.config has been added to allow the project to be hosted on a Windows server through ISSNode, the web.config needs the `index.js` as a pointer/handler to run the next server. So do not delete this if you plan on running it on an ISSNode. Don't forget to this line to the `package.json`:
```json
{ "main": "index.js" }
```

## Misc
- A generic robots.txt has been added that disallows EVERY bot, it is removed in the azure-pipelines.yml on the main branch

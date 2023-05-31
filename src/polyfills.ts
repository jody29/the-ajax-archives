/**
 * Add global polyfills for application
 * Next.js adds corejs (babel-polyfill), the URL api and fetch by default so you dont have to include those
 */

import 'intersection-observer';

const enableAxe = false;

if (enableAxe) {
  require('./a11y');
}

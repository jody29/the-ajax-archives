/**
 * The lint rules are extended from `dept-react-scripts`.
 * You can add or overwrite rules if you want to.
 *
 * If you wish to eject from `dept-react-script` run `npx dept-react-scripts eslint-eject`
 */

module.exports = {
  extends: [
    './node_modules/dept-react-scripts/config/eslint/react',
    'plugin:@next/next/recommended',
  ],
  rules: {
    'react/display-name': 'off',
    'import/no-anonymous-default-export': 'off',
  },
  globals: {
    React: 'writable',
  },
};

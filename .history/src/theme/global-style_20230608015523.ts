import { CSSObject } from '@chakra-ui/react';

export const globalStyle: CSSObject = {
  'html, body': {
    backgroundColor: 'white',
  },
  body: {
    minWidth: '320px',
  },
  '*': {
    boxSizing: 'border-box',
  },
  ".player-line": {
    display: 'flex',
  },
  ".non-bold": {
    width: '24rem'
  }
};

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
  '.players': {
    marginLeft: '2rem'
  },
  '.non-bold': {
    width: '40rem'
  }
};

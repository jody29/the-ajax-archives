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
    fontWeight: 'bold',
  },
  '.lineup': {
    display: 'flex',
  },
  '.player': {
    marginLeft: '10px'
  }
};

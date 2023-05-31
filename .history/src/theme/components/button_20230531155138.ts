import { ComponentStyleConfig, theme } from '@chakra-ui/react';

import { keyboardFocussed } from '../tools/keyboard-focussed';
import { link } from './link';

export const button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'none',
    fontWeight: 'normal',
    fontFamily: 'body',
  },
  defaultProps: {
    variant: 'primary',
    size: 'md',
  },
  variants: {
    primary: {
      backgroundColor: 'red',
      width: 'fit-content',
      padding: '25px 20px',
      fontSize: '1.4rem',
      color: 'white',
      ...keyboardFocussed({
        boxShadow: 'outline',
      }),
    },
    active: {
      backgroundColor: '#a11717',
      fontSize: '1.4rem',
      width: 'fit-content',
      padding: '25px 20px',
      color: 'white',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: 'white',
      ...keyboardFocussed({
        boxShadow: 'outline',
      }),
    },
    link: {
      // Imports next base styles
      ...theme.components.Link.baseStyle,
      // Overries with our own changes
      ...link.baseStyle,
    },
    icon: {
      backgroundColor: 'black',
      width: '40px',
      height: '40px',
      minWidth: '0px',
      borderRadius: 'full',
      p: '0',
      _hover: {
        backgroundColor: 'secondary',
        transform: 'scale(1.2)',
      },
      ...keyboardFocussed({
        backgroundColor: 'secondary',
        transform: 'scale(1.2)',
      }),
      svg: {
        width: '20px',
        height: '20px',
      },
      path: {
        fill: 'white',
      },
    },
  },
};

import { ComponentStyleConfig, theme } from '@chakra-ui/react';

import { keyboardFocussed } from '../tools/keyboard-focussed';
import { link } from './link';

export const button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'none',
    fontWeight: 'regular',
  },
  defaultProps: {
    variant: 'primary',
    size: 'md',
  },
  variants: {
    primary: {
      backgroundColor: 'primary',
      color: 'white',
      ...keyboardFocussed({
        boxShadow: 'outline',
      }),
    },
    secondary: {
      backgroundColor: 'secondary',
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

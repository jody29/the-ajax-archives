import { SystemStyleInterpolation } from '@chakra-ui/theme-tools';

import { KEYBOARD_FOCUSED } from '@/utils/detectKeyboardFocus';

export const keyboardFocussed = (css: SystemStyleInterpolation) => ({
  '&:focus': {
    outline: 'none',
  },
  '@media (pointer: fine)': {
    [`.${KEYBOARD_FOCUSED} &:focus`]: css,
  },
});

import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';
import { components } from './components';
import { globalStyle } from './global-style';
import { sizes } from './sizes';
import { fonts } from './typography';

export const theme = extendTheme({
  components,
  colors,
  fonts,
  sizes,
  styles: { global: globalStyle },
});

export type CustomTheme = typeof theme;

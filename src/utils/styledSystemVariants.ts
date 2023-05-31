import { BoxProps } from '@chakra-ui/react';

export const styledSystemVariants = <T>(et: { [K in keyof T]: BoxProps['sx'] }) => et;

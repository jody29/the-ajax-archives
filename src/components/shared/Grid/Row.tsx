import { BoxProps, Flex , useTheme } from '@chakra-ui/react';

import { Space } from './Space';

interface GutterProps {
  gap?: any[] | number;
}

type RowProps = BoxProps & GutterProps;

export function Row({ gap, children, ...props }: RowProps) {
  const themeContext = useTheme();
  const hasGap = gap || gap === 0;

  if (!hasGap && themeContext && themeContext.grid) {
    gap = themeContext.grid.gap;
  }

  if (!hasGap) {
    gap = 15;
  }

  const spacing =
    gap && Array.isArray(gap) ? gap.map(space => space && space / 2) : (gap as number) / 2;

  const mx =
    gap && Array.isArray(gap)
      ? gap.map(space => space && (space / 2) * -1)
      : ((gap as number) / 2) * -1;

  return (
    <Flex mx={mx} flexWrap="wrap" {...props}>
      <Space px={spacing}>{children}</Space>
    </Flex>
  );
}

Row.displayName = 'Row';

import { Box, BoxProps , ResponsiveValue } from '@chakra-ui/react';

type ColumnProps = Omit<BoxProps, 'inset'> & {
  col?: number | (number | null | string)[] | Record<string, number | null | string>;
  inset?: number | (number | null | string)[] | Record<string, number | null | string>;
};

function reduceStyleObject(n: Record<string, number | null | string>) {
  return Object.entries(n).reduce((acc, [key, val]) => {
    acc[key] = transformValue(val);

    return acc;
  }, {} as Record<string, number | null | string>);
}

function transformValue(n: string | number | null) {
  if (!n || isNaN(n as any)) {
    return n;
  }

  const cols = Number(n);
  return (cols / 12) * 100 + '%';
}

export function Column({ col, inset, ...props }: ColumnProps) {
  const width: ResponsiveValue<any> =
    col && Array.isArray(col)
      ? col.map(transformValue)
      : typeof col === 'object' && col !== null
      ? reduceStyleObject(col)
      : transformValue(col!) || undefined;

  const ml: ResponsiveValue<any> =
    inset && Array.isArray(inset)
      ? inset.map(transformValue)
      : typeof inset === 'object' && inset !== null
      ? reduceStyleObject(inset)
      : transformValue(inset!) || undefined;

  return <Box {...props} width={width} ml={ml} />;
}

Column.displayName = 'Column';

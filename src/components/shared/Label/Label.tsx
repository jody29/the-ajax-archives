import { Box, BoxProps } from '@chakra-ui/react';

interface LabelProps extends BoxProps {
  htmlFor?: string;
  required?: boolean;
}

export function Label({ children, color, required, ...props }: LabelProps) {
  return (
    <Box
      as="label"
      sx={{
        cursor: 'pointer',
        userSelect: 'none',
        fontWeight: 'medium',
        fontSize: 'sm',
        color: color || 'gray.700',
      }}
      {...props}
    >
      {children}
      {required ? ' *' : null}
    </Box>
  );
}

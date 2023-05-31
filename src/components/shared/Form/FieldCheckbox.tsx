import { Box, Flex, Text , useTheme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { hideVisually } from 'polished';
import { InputHTMLAttributes } from 'react';
import { FaCheck } from 'react-icons/fa';

import { Label } from '@/components/shared/Label';

export interface FieldCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  hasError?: any;
  value?: string;
  name: string;
}

const HiddenInput = styled.input`
  ${hideVisually()};
`;

export const FieldCheckbox = ({
  children,
  onFocus,
  onChange,
  onBlur,
  hasError,
  required,
  ...props
}: FieldCheckboxProps) => {
  const theme = useTheme();
  return (
    <Label>
      <Flex opacity={props.disabled ? 0.2 : 1} alignItems="center">
        <HiddenInput
          type="checkbox"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          {...props}
        />
        <Box
          mr={3}
          sx={{
            height: 25,
            width: 25,
            bg: 'white',
            border: '2px solid',
            borderRadius: 4,
            borderColor: hasError ? 'error' : 'primary',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxSizing: 'border-box',
            color: 'white',
            'input[type=checkbox]:checked + &': {
              bg: 'primary',
            },
            'input[type=checkbox]:focus + &': {
              outline: 'none',
              boxShadow: theme.shadows.outline,
            },
          }}
        >
          <FaCheck size={13} />
        </Box>
        <Box>
          <Text color="gray.800" fontSize={14}>
            {children}
          </Text>
        </Box>
      </Flex>
    </Label>
  );
};

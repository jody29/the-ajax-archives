import { Flex, Box, Text , useTheme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { hideVisually } from 'polished';
import { InputHTMLAttributes } from 'react';

import { Label } from '@/components/shared/Label';

export interface FieldRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  hasError?: any;
  checked?: boolean;
  value?: string;
}

const HiddenInput = styled.input`
  ${hideVisually()};
`;

export const FieldRadio = ({ children, hasError, ...props }: FieldRadioProps) => {
  const theme = useTheme();
  return (
    <Label>
      <Flex opacity={props.disabled ? 0.2 : 1} alignItems="center">
        <HiddenInput type="radio" {...props} />
        <Box
          className="field-radio"
          mr={3}
          my={1}
          sx={{
            display: 'inline-flex',
            flexShrink: 0,
            height: 25,
            width: 25,
            borderRadius: '50%',
            border: '2px solid',
            borderColor: hasError ? 'error' : 'primary',
            'input[type=radio]:checked + &': {
              borderWidth: '6px',
              bg: 'white',
            },
            'input[type=radio]:focus + &': {
              outline: 'none',
              boxShadow: theme.shadows.outline,
            },
          }}
        />
        <Text>{children}</Text>
      </Flex>
    </Label>
  );
};

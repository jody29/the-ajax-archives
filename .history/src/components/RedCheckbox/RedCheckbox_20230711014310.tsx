import CheckIcon from "@/icons/components/Check";
import { Box, Icon, useCheckbox } from "@chakra-ui/react";
import { ChangeEvent } from "react";

export interface RedCheckboxProps {
  name: string;
  value: string;
  label: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  hasError?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const RedCheckbox = (props: RedCheckboxProps) => {
  const { getInputProps, getCheckboxProps } = useCheckbox(props)

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
      {...checkbox}
      cursor='pointer'
      borderRadius='base'
      bg='white'
      _checked={{
        bg: 'white'
      }}
      >
        <Icon color='white'>
          <CheckIcon />
        </Icon>
      </Box>
    </Box>
  );
}

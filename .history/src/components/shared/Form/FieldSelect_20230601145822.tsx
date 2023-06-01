import { Box, BoxProps, Icon } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useSelect } from 'downshift';
import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { HiSelector } from 'react-icons/hi';

import { Label } from '@/components/shared/Label/Label';

import { InputWrapper } from './FieldInput';
import { FaChevronDown } from 'react-icons/fa';

type Value = string | number;

interface Option {
  value: Value;
  label: Value;
}

export interface FieldSelectProps extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  name: string;
  options: Option[];
  color?: string;
  label?: string;
  placeholder?: string;
  hasError?: boolean;
  native?: boolean;
  onChange?: (value: Value) => void;
}

export const List = forwardRef<any, BoxProps & { isOpen: boolean }>(({ isOpen, ...props }, ref) => {
  const activeProps: BoxProps = isOpen
    ? {
        transform: `scale(1) translateX(-50%)`,
        opacity: 1,
        pointerEvents: 'all',
      }
    : {};

  return (
    <Box
      padding={0}
      margin={0}
      listStyleType="none"
      position="absolute"
      top="15px"
      left="50%"
      maxHeight="300px"
      overflow="auto"
      zIndex={100}
      pointerEvents="none"
      transformOrigin="left center"
      transition="transform 0.1s ease-out, opacity 0.1s ease"
      boxShadow="0px 5px 5px -3px rgba(0, 0, 0, 0.05), 0px 8px 10px 1px rgba(0, 0, 0, 0.05), 0px 3px 14px 2px rgba(0, 0, 0, 0.05)"
      borderRadius="4px"
      opacity="0"
      transform="scale(0.8) translateX(-50%)"
      _focus={{
        outline: 'none',
      }}
      {...props}
      {...activeProps}
      ref={ref}
    />
  );
});

const ListItem = Box;

function CustomSelect({
  name,
  options: items,
  color,
  label,
  onChange,
  placeholder,
  hasError,
  required,
  value,
  ...rest
}: FieldSelectProps) {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    id: name,
    selectedItem: items.find(item => item.value === value),
    onSelectedItemChange: e => {
      if (e?.selectedItem?.value && onChange) {
        onChange(e?.selectedItem?.value);
      }
    },
  });

  const [hasFocus, setFocus] = useState(false);

  function onFocus(e: React.FocusEvent<HTMLButtonElement>) {
    if (rest.onFocus) rest.onFocus(e as any);
    setFocus(true);
  }

  function onBlur(e: React.FocusEvent<HTMLButtonElement>) {
    if (rest.onBlur) rest.onBlur(e as any);
    setFocus(false);
  }

  return (
    <Box position="relative">
      {label && (
        <Label color={color} required={required} hasError={hasError} {...getLabelProps()}>
          {label}
        </Label>
      )}
      <InputWrapper color={color} hasError={hasError} hasFocus={hasFocus}>
        <Box
          height="100%"
          width="100%"
          display="block"
          p="6px 14px"
          as="button"
          type="button"
          textAlign="left"
          bg="white"
          border="none"
          outline="none"
          cursor="pointer"
          {...getToggleButtonProps({
            onFocus,
            onBlur,
          })}
        >
          {(selectedItem && selectedItem.label) || placeholder || '-'}
          <Icon>
            <FaChevronDown />
          </Icon>
        </Box>
      </InputWrapper>
      <List
        isOpen={isOpen}
        as="ul"
        bg="white"
        color="black"
        minWidth={200}
        maxWidth="100%"
        {...getMenuProps()}
      >
        {items.map((item, index) => (
          <ListItem
            color={highlightedIndex === index ? 'white' : 'black'}
            as="li"
            cursor="pointer"
            bg={highlightedIndex === index ? 'rgba(226, 59, 59, 1)' : null}
            p="12px 14px"
            key={`${item}${index}`}
            {...getItemProps({ item, index })}
          >
            {item.label}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

const Select = styled.select`
  -webkit-appearance: none;
  background-color: transparent;
  width: 100%;
  display: block;
  border: none;
  padding: 12px 14px;
  height: 50px;
  &::-ms-expand {
    display: none;
  }
  &:focus {
    outline: none;
  }
  &:invalid {
    opacity: 0.5;
  }
`;

const IconWrapper = styled(Box)`
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  color: #888;
`;

function NativeSelect({
  name,
  options: items,
  color,
  label,
  required,
  placeholder,
  hasError,
  defaultValue = '',
  onChange = () => {
    /** noop */
  },
  disabled,
  ...rest
}: FieldSelectProps) {
  const [hasFocus, setFocus] = useState(false);

  function onFocus(e: React.FocusEvent<HTMLSelectElement>) {
    if (rest.onFocus) rest.onFocus(e);
    setFocus(true);
  }

  function onBlur(e: React.FocusEvent<HTMLSelectElement>) {
    if (rest.onBlur) rest.onBlur(e);
    setFocus(false);
  }

  return (
    <>
      {label && (
        <Label htmlFor={name} color={color} required={required}>
          {label}
        </Label>
      )}
      <InputWrapper hasFocus={hasFocus} color={color} hasError={hasError}>
        <Select
          id={name}
          name={name}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          defaultValue={defaultValue}
          {...rest}
        >
          {placeholder && (
            <option disabled value="">
              {placeholder}
            </option>
          )}
          {items.map((item, index) => (
            <option key={`${item}${index}`} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
        <IconWrapper position="absolute" right={3} top="50%">
          <HiSelector size={18} />
        </IconWrapper>
      </InputWrapper>
    </>
  );
}

export function FieldSelect(props: FieldSelectProps) {
  if (!props.placeholder) {
    props = {
      ...props,
      placeholder: 'Choose option...',
    };
  }

  if (props.native) {
    return <NativeSelect {...props} />;
  } else {
    return <CustomSelect {...props} />;
  }
}

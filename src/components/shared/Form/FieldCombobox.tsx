import { Box, Button, VisuallyHidden } from '@chakra-ui/react';
import { useCombobox, UseComboboxProps } from 'downshift';
import { useState, useEffect } from 'react';
import { HiSelector } from 'react-icons/hi';

import { FieldInput, FieldInputProps } from './FieldInput';
import { List } from './FieldSelect';

type Value = string | number;

interface Option {
  value: Value;
  label: Value;
}

export type FieldComboboxProps = Omit<FieldInputProps, 'type' | 'onChange'> & {
  options: Option[];
  onChange?: (value: Value) => void;
  showSelector?: boolean;
  onTyping?: (inputValue: string) => void;
};

const ListItem = Box;

const stateReducer: UseComboboxProps<Option>['stateReducer'] = (state, actionAndChanges) => {
  const { type, changes } = actionAndChanges;

  // returning an uppercased version of the item string.
  switch (type) {
    // also on selection.
    case useCombobox.stateChangeTypes.InputBlur:
    case useCombobox.stateChangeTypes.InputKeyDownEnter:
    case useCombobox.stateChangeTypes.ItemClick:
    case useCombobox.stateChangeTypes.FunctionSelectItem:
    case useCombobox.stateChangeTypes.FunctionSetInputValue:
      return {
        ...changes,
        inputValue: changes.selectedItem ? String(changes.selectedItem?.label) : changes.inputValue,
      };
    default:
      return changes; // otherwise business as usual.
  }
};

export const FieldCombobox = ({
  options: items,
  onChange,
  showSelector,
  onTyping,
  placeholder = 'Choose option...',
  clearable = true,
  ...rest
}: FieldComboboxProps) => {
  const [inputItems, setInputItems] = useState(items);

  useEffect(() => {
    setInputItems(items);
  }, [items]);

  const {
    isOpen,
    // selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    reset,
    openMenu,
    closeMenu,
  } = useCombobox({
    items: inputItems,
    stateReducer,
    onInputValueChange: ({ inputValue = '' }) => {
      const matches = items.filter(item =>
        String(item.label).toLowerCase().startsWith(inputValue.toLowerCase()),
      );

      setInputItems(matches);

      if (onTyping) {
        onTyping(inputValue);
      }
    },
    onSelectedItemChange: e => {
      if (e?.selectedItem?.value && onChange) {
        onChange(e?.selectedItem?.value);
      }

      closeMenu();
    },
  });

  return (
    <Box position="relative" {...getComboboxProps()}>
      <FieldInput
        {...rest}
        placeholder={placeholder}
        clearable={clearable}
        {...getInputProps({
          onFocus: () => {
            openMenu();
          },
        })}
        labelProps={getLabelProps()}
        onClear={() => {
          reset();
        }}
        end={
          showSelector && (
            <Button variant="icon" {...getToggleButtonProps()} icon={HiSelector}>
              <HiSelector />
              <VisuallyHidden>Toggle menu</VisuallyHidden>
            </Button>
          )
        }
      />

      <Box position="relative">
        <List
          isOpen={isOpen}
          as="ul"
          bg="white"
          color="black"
          minWidth={200}
          maxWidth="100%"
          {...getMenuProps()}
        >
          {inputItems.map((item, index) => (
            <ListItem
              color="black"
              as="li"
              cursor="pointer"
              bg={highlightedIndex === index ? 'rgba(0, 0, 0, 0.04)' : null}
              p="12px 14px"
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item.label}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

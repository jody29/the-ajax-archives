import { Column, Row } from '@/components/shared/Grid';

import { FieldCheckbox, FieldCheckboxProps } from './FieldCheckbox';

export interface Option {
  value: string;
  label: string;
}

export type FieldCheckboxGroupProps = FieldCheckboxProps & {
  options: Option[];
  name: string;
  direction?: 'horizontal' | 'vertical';
  value: string[];
};

export const FieldCheckboxGroup = ({
  name,
  options,
  value,
  direction = 'vertical',
  onChange,
  ...props
}: FieldCheckboxGroupProps) => {
  return (
    <Row flexDirection={direction === 'horizontal' ? 'row' : 'column'} flexWrap="wrap">
      {options.map((option, index) => {
        const checked = Boolean(value && value.includes(option.value));

        return (
          <Column key={index} mb={direction === 'vertical' ? 2 : 0}>
            <FieldCheckbox
              name={name}
              value={option.value}
              onChange={onChange}
              {...props}
              // has to be after props
              checked={checked}>
              {option.label}
            </FieldCheckbox>
          </Column>
        );
      })}
    </Row>
  );
};

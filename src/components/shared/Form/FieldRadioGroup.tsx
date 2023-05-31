import { Column, Row } from '@/components/shared/Grid';

import { FieldRadio, FieldRadioProps } from './FieldRadio';

interface Option {
  value: string;
  label: string;
}

export type FieldRadioGroupProps = FieldRadioProps & {
  options: Option[];
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  name: string;
  direction?: 'horizontal' | 'vertical';
  value: string | undefined;
};

export const FieldRadioGroup = ({
  name,
  options,
  value,
  direction = 'vertical',
  onChange,
  ...props
}: FieldRadioGroupProps) => {
  return (
    <Row flexDirection={direction === 'horizontal' ? 'row' : 'column'} flexWrap="wrap">
      {options.map((option, index) => {
        return (
          <Column key={index} mb={direction === 'vertical' ? 2 : 0}>
            <FieldRadio
              name={name}
              value={option.value}
              onChange={onChange}
              {...props}
              checked={value === option.value}>
              {option.label}
            </FieldRadio>
          </Column>
        );
      })}
    </Row>
  );
};

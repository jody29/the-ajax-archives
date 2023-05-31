import NumberFormat, { NumberFormatProps } from 'react-number-format';

import { FieldInput, FieldInputProps } from './FieldInput';

export type FieldNumberFormatProps = Omit<FieldInputProps, 'type'> & NumberFormatProps<any>;

export const FieldNumberFormat = (props: FieldNumberFormatProps) => {
  return <NumberFormat customInput={FieldInput} {...props} />;
};

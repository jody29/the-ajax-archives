import { useField, useForm } from 'react-final-form';

import { FieldDate, FieldDateProps } from '../Form/FieldDate';
import { FormError } from './FormError';

type FormDateProps = Omit<FieldDateProps, 'onChange' | 'value'> & {
  name: string;
};

export const FormDate = ({ name, ...props }: FormDateProps) => {
  const form = useForm();
  const { input, meta } = useField(name);

  return (
    <>
      <FieldDate
        {...props}
        {...input}
        onChange={date => {
          form.change(name, date);
        }}
        onClear={() => {
          form.change(name, undefined);
        }}
        hasError={Boolean(meta.touched && meta.error)}
      />

      <FormError name={name} />
    </>
  );
};

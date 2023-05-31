import { useField, useForm } from 'react-final-form';

import { FieldNumberFormat, FieldNumberFormatProps } from '../Form/FieldNumberFormat';
import { FormError } from './FormError';

type FormNumberFormatProps = FieldNumberFormatProps & {
  name: string;
};

export const FormNumberFormat = ({ name, type, ...props }: FormNumberFormatProps) => {
  const form = useForm();
  const { input, meta } = useField(name);

  return (
    <>
      <FieldNumberFormat
        {...props}
        {...input}
        type={type}
        onChange={() => {
          /** noop */
        }}
        onValueChange={object => {
          form.change(name, object.floatValue);
        }}
        hasError={Boolean(meta.touched && meta.error)}
        onClear={() => {
          form.change(name, '');
        }}
      />

      <FormError name={name} />
    </>
  );
};

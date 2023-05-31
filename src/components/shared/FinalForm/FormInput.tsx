import { useField, useForm } from 'react-final-form';

import { FieldInput, FieldInputProps } from '../Form/FieldInput';
import { FormError } from './FormError';

type FormInputProps = FieldInputProps & {
  name: string;
};

export const FormInput = ({ name, type = 'text', ...props }: FormInputProps) => {
  const form = useForm();
  const { input, meta } = useField(name, {
    type,
  });

  return (
    <>
      <FieldInput
        {...props}
        {...input}
        type={type}
        value={input.value ?? ''}
        hasError={Boolean(meta.touched && meta.error)}
        onClear={() => {
          form.change(name, '');
        }}
      />

      <FormError name={name} />
    </>
  );
};

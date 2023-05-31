import { useField, useForm } from 'react-final-form';

import { FieldRadioGroup, FieldRadioGroupProps } from '../Form/FieldRadioGroup';
import { FormError } from './FormError';

type FormRadioGroupProps = Omit<FieldRadioGroupProps, 'onChange' | 'value'>;

export const FormRadioGroup = ({ name, ...props }: FormRadioGroupProps) => {
  const form = useForm();
  const { input, meta } = useField(name);

  return (
    <>
      <FieldRadioGroup
        {...props}
        {...input}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          form.change(name, e.currentTarget.value)
        }
        hasError={meta.touched && meta.error}
      />

      <FormError name={name} />
    </>
  );
};

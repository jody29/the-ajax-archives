import { useField, useForm } from 'react-final-form';

import { FieldCheckbox, FieldCheckboxProps } from '../Form/FieldCheckbox';
import { FormError } from './FormError';

type FormCheckboxProps = FieldCheckboxProps & {
  name: string;
};

export function FormCheckbox({ name, children, ...props }: FormCheckboxProps) {
  const form = useForm();
  const { input, meta } = useField(name);

  return (
    <>
      <FieldCheckbox
        {...props}
        {...input}
        hasError={meta.touched && meta.error}
        value={'true'}
        checked={!!input.value}
        onChange={e => form.change(name, e.currentTarget.checked)}>
        {children}
      </FieldCheckbox>

      <FormError name={name} />
    </>
  );
}

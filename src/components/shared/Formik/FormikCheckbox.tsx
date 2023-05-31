import { FastField, Field, FieldProps } from 'formik';

import { FieldCheckbox, FieldCheckboxProps } from '../Form/FieldCheckbox';
import { FormikError } from './FormikError';

type FormikCheckboxProps = FieldCheckboxProps & {
  name: string;
  optimized?: boolean;
};

export const FormikCheckbox = ({
  name,
  optimized = true,
  children,
  ...props
}: FormikCheckboxProps) => {
  const Component = optimized ? FastField : Field;

  return (
    <>
      <Component name={name}>
        {({ field, meta, form }: FieldProps<any>) => (
          <FieldCheckbox
            {...props}
            {...field}
            hasError={meta.touched && meta.error}
            value={'true'}
            checked={meta.value}
            onChange={e => form.setFieldValue(name, e.currentTarget.checked)}>
            {children}
          </FieldCheckbox>
        )}
      </Component>

      <FormikError name={name} />
    </>
  );
};

import { FastField, Field, FieldProps } from 'formik';

import { FieldDate, FieldDateProps } from '../Form/FieldDate';
import { FormikError } from './FormikError';

type FormikDateProps = Omit<FieldDateProps, 'onChange' | 'value'> & {
  name: string;
  optimized?: boolean;
};

export const FormikDate = ({ name, optimized = true, ...props }: FormikDateProps) => {
  const Component = optimized ? FastField : Field;

  return (
    <>
      <Component name={name}>
        {({ field, meta, form }: FieldProps<any>) => (
          <FieldDate
            {...props}
            {...field}
            onClose={() => form.setFieldTouched(name, true)}
            onChange={date => {
              form.setFieldValue(name, date);
            }}
            onClear={() => {
              form.setFieldValue(name, undefined);
            }}
            hasError={Boolean(meta.touched && meta.error)}
          />
        )}
      </Component>

      <FormikError name={name} />
    </>
  );
};

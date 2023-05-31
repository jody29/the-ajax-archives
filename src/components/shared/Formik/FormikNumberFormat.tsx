import { FastField, Field, FieldProps } from 'formik';

import { FieldNumberFormat, FieldNumberFormatProps } from '../Form/FieldNumberFormat';
import { FormikError } from './FormikError';

type FormikNumberFormatProps = FieldNumberFormatProps & {
  name: string;
  optimized?: boolean;
};

export const FormikNumberFormat = ({
  name,
  type,
  optimized = true,
  ...props
}: FormikNumberFormatProps) => {
  const Component = optimized ? FastField : Field;

  return (
    <>
      <Component name={name}>
        {({ field, meta, form }: FieldProps<any>) => (
          <FieldNumberFormat
            {...props}
            {...field}
            onChange={() => {
              /** noop */
            }}
            type={type}
            hasError={Boolean(meta.touched && meta.error)}
            onValueChange={object => {
              form.setFieldValue(name, object.floatValue);
            }}
            onClear={() => {
              form.setFieldValue(name, '');
            }}
          />
        )}
      </Component>
      <FormikError name={name} />
    </>
  );
};

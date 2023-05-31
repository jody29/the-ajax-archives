import { FormikHelpers } from 'formik';

export type SubmitHandler<FormValues> = (
  values: FormValues,
  actions: FormikHelpers<FormValues>,
) => void;

import { FormApi } from 'final-form';

export type SubmitHandler<T> = (values: T, helpers: FormApi<T>) => void;

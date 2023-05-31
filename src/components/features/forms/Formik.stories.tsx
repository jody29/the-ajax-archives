import { subYears } from 'date-fns';
import { object, string, date, array, number } from 'yup';

import { SubmitHandler } from '@/components/shared/Formik/types';

import { FormikExampleForm } from './FormikExampleForm';

export default { title: 'Forms/Formik' };

const languages = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'nl',
    label: 'Dutch',
  },
  {
    value: 'de',
    label: 'German',
  },
  {
    value: 'fr',
    label: 'French',
  },
];

const countries = [
  {
    value: 'nl',
    label: 'The Netherlands',
  },
  {
    value: 'de',
    label: 'Germany',
  },
  {
    value: 'uk',
    label: 'United Kingdom',
  },
];

const animals = [
  {
    value: 'dog',
    label: 'Dog',
  },
  {
    value: 'cat',
    label: 'Cat',
  },
  {
    value: 'chicken',
    label: 'Chicken',
  },
  {
    value: 'fish',
    label: 'Fish',
  },
];

interface ProgrammingLanguageValues {
  name: string;
  years: number | undefined;
}

type FormValues = {
  firstname: string;
  lastname: string;
  country: string;
  phoneNumber: string;
  email: string;
  dob: Date | null;
  languages: string[];
  favoriteAnimal: string;
  programmingLanguages: ProgrammingLanguageValues[];
};

const initialProgrammingLanguage: ProgrammingLanguageValues = {
  name: '',
  years: undefined,
};

const initialValues: FormValues = {
  firstname: '',
  lastname: '',
  email: '',
  country: '',
  phoneNumber: '',
  dob: null,
  languages: [],
  programmingLanguages: [],
  favoriteAnimal: '',
};

/**
 * https://github.com/jquense/yup
 */
const validationSchema = object({
  firstname: string().label('First name').required(),
  lastname: string().label('Last name').required(),
  email: string().email().label('E-mail').required(),
  dob: date()
    .typeError('Must be a valid date')
    .label('Date of birth')
    .max(subYears(new Date(), 18), 'You need to be 18 years or older')
    .required(),
  phoneNumber: string().label('Phone number').required(),
  country: string().label('Country').required(),
  languages: array(string()).label('Languages').min(1),
  programmingLanguages: array(
    object({
      name: string().label('Name').required(),
      years: number().label('Years').min(0).required(),
    }),
  )
    .label('Programming languages')
    .required(),
  favoriteAnimal: string().label('Favorite animal').required(),
});

export const example = () => {
  const submitHandler: SubmitHandler<FormValues> = async (values, actions) => {
    actions.setSubmitting(true);
    console.log(values, actions);
    alert(JSON.stringify(values));
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 3000);
  };

  return (
    <FormikExampleForm
      onSubmit={submitHandler}
      validationSchema={validationSchema}
      initialValues={initialValues}
      initialProgrammingLanguage={initialProgrammingLanguage}
      animals={animals}
      languages={languages}
      countries={countries}
    />
  );
};

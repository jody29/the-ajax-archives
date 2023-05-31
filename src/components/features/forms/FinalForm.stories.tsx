import { subYears } from 'date-fns';
import { object, string, date, array, number } from 'yup';

import { FinalFormExampleForm } from './FinalFormExampleForm';

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

export default {
  title: 'Forms/Final-form',
  component: FinalFormExampleForm,
  argTypes: {
    onSubmit: {
      action: 'submitted',
    },
    languages: {
      defaultValue: languages,
    },
    countries: {
      defaultValue: countries,
    },
    animals: {
      defaultValue: animals,
    },
    initialProgrammingLanguage: {
      defaultValue: initialProgrammingLanguage,
    },
    validationSchema: {
      defaultValue: validationSchema,
    },
    initialValues: {
      defaultValue: initialValues,
    },
  },
};

export const example = FinalFormExampleForm;

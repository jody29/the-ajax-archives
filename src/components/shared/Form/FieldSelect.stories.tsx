import { Story } from '@storybook/react';

import { FieldSelect, FieldSelectProps } from './FieldSelect';

const frameworks = ['React', 'Vue', 'Angular', 'Svelte', 'Ember'].map(item => ({
  value: item,
  label: item,
}));

export default {
  title: 'Forms/Select field',
  component: FieldSelect,
  argTypes: {
    native: {
      defaultValue: true,
      control: {
        type: 'boolean',
      },
    },
    hasError: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    label: {
      defaultValue: 'Some label',
      control: {
        type: 'text',
      },
    },
    placeholder: {
      defaultValue: 'john@doe.nl',
      control: {
        type: 'text',
      },
    },
    options: {
      defaultValue: frameworks,
    },
    name: {
      defaultValue: 'framework',
    },
  },
};

export const example: Story<FieldSelectProps> = FieldSelect;

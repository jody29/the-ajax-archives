import { FieldInput } from './FieldInput';

export default {
  title: 'Forms/Input field',
  component: FieldInput,
  argTypes: {},
};

export const withLabel = (args: any) => (
  <FieldInput {...args} name="firstName" label="First name" type="textarea" />
);

export const withPlaceholder = () => <FieldInput name="firstName" placeholder="First name" />;

export const branded = () => <FieldInput name="search" placeholder="Boek, product of studie..." />;

export const otherType = () => (
  <FieldInput
    type="number"
    name="pancakes"
    label="Amount of pancakes"
    min={1}
    max={10}
  ></FieldInput>
);

export const disabled = (args: any) => (
  <FieldInput {...args} name="firstName" disabled label="First name"></FieldInput>
);

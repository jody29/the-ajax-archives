import { FieldCombobox } from './FieldCombobox';

export default { title: 'Forms/Combobox', component: FieldCombobox };

export const example = () => (
  <FieldCombobox
    name="combo"
    label="Fruit"
    placeholder="Pick a fruit"
    options={[
      {
        value: 'apple',
        label: 'Apple',
      },
      {
        value: 'banana',
        label: 'Banana',
      },
      {
        value: 'orange',
        label: 'Orange',
      },
      {
        value: 'pear',
        label: 'Pear',
      },
    ]}></FieldCombobox>
);

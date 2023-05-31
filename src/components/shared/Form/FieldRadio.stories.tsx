import { FieldRadio } from './FieldRadio';

export default { title: 'Forms/Radio', component: FieldRadio };

export const example = () => (
  <>
    <FieldRadio name="gender" value="male">
      Male
    </FieldRadio>
    <FieldRadio name="gender" value="female">
      Female
    </FieldRadio>
    <FieldRadio name="gender" value="other">
      Other
    </FieldRadio>
  </>
);

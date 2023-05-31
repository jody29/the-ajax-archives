/**
 * useFastField is a custom hook that should be deprecated as soon as the following pull request to Formik lands:
 * https://github.com/formium/formik/pull/1772
 */

import {
  FieldHelperProps,
  FieldHookConfig,
  FieldInputProps,
  FieldMetaProps,
  useField,
} from 'formik';
import { ChangeEvent, useEffect, useState } from 'react';

export function useFastField<Val = any>(
  propsOrFieldName: string | FieldHookConfig<Val>,
): [FieldInputProps<Val>, FieldMetaProps<Val>, FieldHelperProps<Val>] {
  const INTERVAL = 150;

  const [field, meta, helpers] = useField(propsOrFieldName);
  const [value, setValue] = useState(field.value);
  const { onBlur, onChange } = field;
  const [fieldChangeEvent, setFieldChangeEvent] = useState<ChangeEvent<any>>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (fieldChangeEvent && fieldChangeEvent?.target) {
        onChange(fieldChangeEvent);
      }
    }, INTERVAL);

    return () => clearTimeout(timeout);
  }, [fieldChangeEvent, onChange]);

  field.value = value;

  field.onChange = (e: ChangeEvent<any>) => {
    if (e?.currentTarget) {
      setValue(e.currentTarget.value);

      e.persist();
      setFieldChangeEvent(e);
    }
  };

  field.onBlur = (e: ChangeEvent<any>) => {
    onChange(e);
    onBlur(e);
  };

  helpers.setValue = value => {
    setValue(value);
  };

  return [field, meta, helpers];
}

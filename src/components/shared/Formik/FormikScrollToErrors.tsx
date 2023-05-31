import dot from 'dot-object';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import scrollToElement from 'scroll-to-element';

type FormikScrollToErrorsProps = {
  offset?: number;
  align?: 'top' | 'middle' | 'bottom';
  ease?: string;
  duration?: number;
};

export const FormikScrollToErrors = ({
  offset = -50,
  duration = 500,
  ease,
  align = 'top',
}: FormikScrollToErrorsProps) => {
  const { errors, isSubmitting, isValidating } = useFormikContext();

  useEffect(() => {
    let timeout: any;

    const shouldScrollToError = isSubmitting && !isValidating;

    if (shouldScrollToError) {
      const flattenErrors = dot.dot(errors);
      const keys = Object.keys(flattenErrors);

      if (keys.length > 0) {
        const element = document.querySelector<HTMLInputElement>(`[name="${keys[0]}"]`);

        if (element) {
          scrollToElement(element, {
            duration,
            offset,
            ease,
            align,
          });

          timeout = setTimeout(() => element.focus(), duration + 200);
        }
      }
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [align, duration, ease, errors, isSubmitting, isValidating, offset]);

  return null;
};

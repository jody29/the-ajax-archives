import dot from 'dot-object';
import { Decorator, FormApi } from 'final-form';
import scrollToElement from 'scroll-to-element';

type ScrollToErrorsProps = {
  offset?: number;
  align?: 'top' | 'middle' | 'bottom';
  ease?: string;
  duration?: number;
};

export const createScrollToErrorDecorator = (
  options?: ScrollToErrorsProps,
): Decorator<any, any> => (form: FormApi) => {
  const defaultOptions = {
    offset: -50,
    duration: 500,
    align: 'top',
  };

  const { offset, duration, ease, align } = {
    ...defaultOptions,
    ...options,
  } as ScrollToErrorsProps;

  let timeout: any;

  const focusOnFirstError = (errors: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    const flattenErrors = dot.dot(errors);
    const keys = Object.keys(flattenErrors);

    if (keys.length > 0) {
      const element = document.querySelector<HTMLInputElement>(`[name="${keys[0]}"]`);

      if (element) {
        scrollToElement(element, {
          duration,
          offset: offset!,
          ease,
          align,
        });

        timeout = setTimeout(() => element.focus(), duration! + 200);
      }
    }
  };
  // Save original submit function
  const originalSubmit = form.submit;

  // Subscribe to errors, and keep a local copy of them
  let state: { errors?: any; submitErrors?: any } = {};
  const unsubscribe = form.subscribe(
    nextState => {
      state = nextState;
    },
    { errors: true, submitErrors: true },
  );

  // What to do after submit
  const afterSubmit = () => {
    const { errors, submitErrors } = state;
    if (errors && Object.keys(errors).length) {
      focusOnFirstError(errors);
    } else if (submitErrors && Object.keys(submitErrors).length) {
      focusOnFirstError(submitErrors);
    }
  };

  // Rewrite submit function
  form.submit = () => {
    const result = originalSubmit.call(form);
    if (result && typeof result.then === 'function') {
      // async
      result.then(afterSubmit, () => {
        /** noop */
      });
    } else {
      // sync
      afterSubmit();
    }
    return result;
  };

  return () => {
    unsubscribe();
    form.submit = originalSubmit;
  };
};

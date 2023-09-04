import { MutableRefObject, useRef, useState } from 'react';
import { FieldError, FieldRule, FormContext, FormValue, Rule, RuleTrigger } from './use-form';

export const useFormCore = (formDom?: MutableRefObject<HTMLDivElement>) => {
  const [values, setValues] = useState<FormValue>({});
  const [rules, _setRules] = useState<FieldRule>({});
  const [errors, setErrors] = useState<FieldError>({});

  const valuesRef = useRef<FormValue>(values);
  const errorsRef = useRef<FieldError>(errors);

  const onChange = (value: any, name?: string) => {
    if (name) {
      valuesRef.current = { ...valuesRef.current, [name]: value };
      setValues((oldValues) => ({ ...oldValues, [name]: value }));
    }
  };

  const reset = () => {
    valuesRef.current = {};
    setValues({});

    errorsRef.current = {};
    setErrors({});
  };

  const submit = () =>
    new Promise((resolve, reject) => {
      validate('onSubmit');

      const err = Object.entries(errorsRef.current).filter(([, error]) => error.length);

      if (err.length) {
        formDom?.current.querySelector('[class*=error]')?.scrollIntoView();

        reject(err);
      }

      resolve(values);
    });

  const setRules = (rule: Rule[], name: string) => {
    _setRules((oldRules) => ({ ...oldRules, [name]: rule }));
  };

  const validateField = (trigger: RuleTrigger, name?: string) => {
    for (const { trigger: ruleTrigger = 'onChange', validator } of rules[name] ?? []) {
      if (ruleTrigger !== trigger && trigger !== 'onSubmit') {
        continue;
      }

      const error = validator(valuesRef.current[name]);

      if (error) {
        errorsRef.current = { ...errorsRef.current, [name]: [error] };
        setErrors((oldErrors) => ({ ...oldErrors, [name]: [error] }));
        return;
      }
    }

    errorsRef.current = { ...errorsRef.current, [name]: [] };
    setErrors((oldErrors) => ({ ...oldErrors, [name]: [] }));
  };

  const validate = (trigger: RuleTrigger = 'onChange', name?: string) => {
    if (name) {
      validateField(trigger, name);
    } else {
      Object.keys(rules).forEach((name) => validateField(trigger, name));
    }
  };

  const formContext: FormContext = {
    values,
    onChange,

    reset,
    submit,

    rules,
    setRules,

    errors,
    validate,
  };

  return formContext;
};

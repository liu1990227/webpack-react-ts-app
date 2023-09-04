import { FC, ReactElement, cloneElement, useEffect, useMemo } from 'react';
import { Rule, useForm } from '../hooks/use-form';

import cls from 'classnames';

import styles from './index.scss';

export interface FormItemProps {
  name?: string;

  label?: string;
  subLabel?: string;
  description?: string;

  rules?: Rule[];

  children?: ReactElement;
}

export interface FieldSchema extends Omit<FormItemProps, 'children'> {
  name: string;

  component: string;
  component_props?: Record<string, any>;
}

export const FormItem: FC<FormItemProps> = ({ name, label, children, subLabel, description, rules }) => {
  const { values, onChange, errors, setRules, validate, rules: formRules } = useForm();

  const value = values[name ?? ''];

  const error = errors[name]?.[0];

  const hasError = error?.type === 'error';

  const fieldRule = formRules[name];

  const component = useMemo(
    () =>
      cloneElement(children, {
        value,

        onChange: (val) => {
          onChange(val, name);
          validate('onChange', name);
        },

        onBlur: () => {
          validate('onBlur', name);
        },
      }),
    [value, JSON.stringify(fieldRule)],
  );

  useEffect(() => setRules(rules, name), [rules]);

  return (
    <div className={cls(styles.formItem, { [styles.errorItem]: hasError })}>
      <label className={styles.label}>{label ?? name}</label>

      <div className={styles.componentWrapper}>
        <div className={styles.subLabel}>{subLabel}</div>
        <div className={styles.component}>{component}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles[error?.type]}>{error?.message}</div>
      </div>
    </div>
  );
};

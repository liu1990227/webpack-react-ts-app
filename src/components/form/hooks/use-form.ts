import { createContext, useContext } from 'react';

export type FormValue = Record<string, any>;

export type RuleTrigger = 'onChange' | 'onBlur' | 'onSubmit';

export interface RuleError {
  type: 'warn' | 'error';
  message: string;
}

export type FieldError = Record<string, RuleError[] | undefined>;

export interface Rule {
  trigger?: RuleTrigger;
  validator?: (value: any) => RuleError | undefined;
}

export type FieldRule = Record<string, Rule[]>;

export interface FormContext<T = FormValue> {
  values?: T;
  onChange?: (value: any, name: string) => any;

  reset?: () => any;
  submit?: () => Promise<FormValue>;

  rules?: FieldRule;
  setRules?: (rules: Rule[], name: string) => any;

  errors?: FieldError;
  validate?: (trigger?: RuleTrigger, name?: string) => any;
}

export const FormContext = createContext<FormContext>({});

export const useForm = () => useContext(FormContext);

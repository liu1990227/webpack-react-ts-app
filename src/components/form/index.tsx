import { FC, ReactNode, createElement, useEffect, useMemo, useRef } from 'react';
import { FormContext } from './hooks/use-form';
import { useFormCore } from './hooks/use-form-core';
import { FieldSchema, FormItem } from './form-item';
import { DEFAULT_RENDERS } from './components';

export interface FormProps {
  schema?: FieldSchema[];
  components?: Record<string, FC>;
  children?: ReactNode;
  getForm?: (form: FormContext) => any;
}

export const Form: FC<FormProps> = ({ getForm, children, schema, components }) => {
  const formDom = useRef<HTMLDivElement>();

  const form = useFormCore(formDom);

  const { values, rules } = form;

  const renders = { ...DEFAULT_RENDERS, ...components };

  const schemaChildren = useMemo(
    () =>
      schema?.map(({ component, component_props, ...props }) => (
        // eslint-disable-next-line react/prop-types
        <FormItem key={props.name} {...props}>
          {createElement(renders[component], component_props)}
        </FormItem>
      )),
    [JSON.stringify(schema)],
  );

  useEffect(() => getForm?.(form), [values, JSON.stringify(rules)]);

  return (
    <FormContext.Provider value={form}>
      <div ref={formDom}>{children ?? schemaChildren}</div>
    </FormContext.Provider>
  );
};

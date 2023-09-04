import { Form } from '@/components/form';
import { FormContext } from '@/components/form/hooks/use-form';
import { Space } from '@/components/space';
import { useState } from 'react';
import { schema } from './config/schema';

export const FormDemo = () => {
  const [form, getForm] = useState<FormContext>({});

  const handleSubmit = () => {
    form
      .submit()
      .then((values) => {
        console.log(values);
      })
      .catch(console.log);
  };

  return (
    <>
      <Form getForm={getForm} schema={schema} />

      <Space>
        <button onClick={form.reset}>reset</button>
        <button onClick={handleSubmit}>submit</button>
      </Space>
    </>
  );
};

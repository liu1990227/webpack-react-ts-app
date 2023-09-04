import { FieldSchema } from '@/components/form/form-item';
import { RuleError } from '@/components/form/hooks/use-form';

export const schema: FieldSchema[] = [
  {
    name: 'username',
    component: 'Input',
    rules: [
      {
        validator(val?: string) {
          if (val?.includes('err')) {
            const err: RuleError = {
              type: 'error',
              message: 'username can not with err',
            };

            return err;
          }
        },
      },
    ],
  },
  {
    name: 'password',
    component: 'Input',
    rules: [
      {
        trigger: 'onBlur',
        validator(val?: string) {
          if (!val?.length) {
            const err: RuleError = {
              type: 'warn',
              message: 'password is required',
            };

            return err;
          }
        },
      },
    ],
  },
];

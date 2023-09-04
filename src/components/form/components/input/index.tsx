import { FC } from 'react';

export interface InputProps {
  value?: string;
  onChange?: (value?: string) => any;
}

export const Input: FC<InputProps> = ({ value = '', onChange, ...props }) => (
  <input
    value={value}
    onChange={(e) => {
      const { value } = e.target;
      onChange?.(value);
    }}
    {...props}
  />
);

import { FC, HTMLProps, useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';

type ICountReducer = (state: number, action: { type: 'increase'; value?: number }) => number;

const countReducer: ICountReducer = (state, { type, value = 1 }) => {
  if (type === 'increase') {
    return state + value;
  }

  return state;
};

const Button: FC<HTMLProps<HTMLButtonElement>> = (props) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    console.log('Button is mounted');

    return () => console.log('Button is removed');
  }, []);

  useEffect(() => console.log('Button is rendered', buttonRef.current));

  useLayoutEffect(() => console.log('Button layout is computed', buttonRef.current));

  return <button {...(props as any)} ref={buttonRef} />;
};

export const Demo: FC = () => {
  const [count, dispath] = useReducer<ICountReducer>(countReducer, 1);
  const [hide, setHide] = useState<boolean>(false);

  const handleClick = () => {
    dispath({
      type: 'increase',
      value: 2,
    });
  };

  console.log(count);

  return (
    <>
      <label>
        hide <input onClick={(e) => setHide((e.target as any).checked)} type="checkbox" />
      </label>
      <hr />
      {!hide && <Button onClick={handleClick}>{count}</Button>}
    </>
  );
};

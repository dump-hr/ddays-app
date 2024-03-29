import { RefCallBack } from 'react-hook-form';

import c from './Input.module.scss';

type InputProps = {
  innerRef?: RefCallBack;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({ innerRef, ...handlers }) => {
  return <input {...handlers} className={c.input} ref={innerRef} />;
};

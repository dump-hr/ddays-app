import { RefCallBack } from 'react-hook-form';

import c from './Textarea.module.scss';

type TextareaProps = {
  innerRef?: RefCallBack;
  rows?: number;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

export const TextArea: React.FC<TextareaProps> = ({
  innerRef,
  rows,
  ...handlers
}) => {
  return (
    <textarea rows={rows} {...handlers} className={c.textarea} ref={innerRef} />
  );
};

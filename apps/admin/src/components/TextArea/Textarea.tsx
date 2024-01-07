import { RefCallBack } from 'react-hook-form';

import c from './Textarea.module.scss';

type InputProps = {
  innerRef?: RefCallBack;
  rows?: number;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;
const TextArea: React.FC<InputProps> = ({ innerRef, rows, ...handlers }) => {
  return (
    <textarea rows={rows} {...handlers} className={c.textarea} ref={innerRef} />
  );
};

export default TextArea;

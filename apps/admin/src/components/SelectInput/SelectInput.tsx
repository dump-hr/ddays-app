import { RefCallBack } from 'react-hook-form';

import c from './SelectInput.module.scss';

type SelectInputProps = {
  options: string[];
  isAllowedEmpty?: boolean;
  innerRef?: RefCallBack;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const SelectInput: React.FC<SelectInputProps> = ({
  options,
  isAllowedEmpty = false,
  innerRef,
  ...handlers
}) => {
  return (
    <>
      <select ref={innerRef} className={c.selectInput} {...handlers}>
        <option value='' disabled={!isAllowedEmpty} hidden={!isAllowedEmpty}>
          -
        </option>
        {options.map((option) => (
          <option key={option} className={c.selectOption} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

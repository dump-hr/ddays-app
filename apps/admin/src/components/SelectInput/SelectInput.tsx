import { RefCallBack } from 'react-hook-form';

import c from './SelectInput.module.scss';

type SelectInputProps = {
  options: string[];
  isAllowedEmpty?: boolean;
  defaultValue?: string | null;
  innerRef?: RefCallBack;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const SelectInput: React.FC<SelectInputProps> = ({
  options,
  isAllowedEmpty = false,
  defaultValue = null,
  innerRef,
  ...handlers
}) => {
  return (
    <>
      <select ref={innerRef} className={c.selectInput} {...handlers}>
        <option value='' disabled={!isAllowedEmpty} hidden={!isAllowedEmpty}>
          {defaultValue || '-'}
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

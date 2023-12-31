import { RefCallBack } from 'react-hook-form';

import c from './SelectInput.module.scss';

type SelectInputProps = {
  options: string[];
  label: string;
  isAllowedEmpty?: boolean;
  innerRef?: RefCallBack;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  label,
  isAllowedEmpty = false,
  innerRef,
  ...handlers
}) => {
  return (
    <>
      <label htmlFor={handlers.id} className={c.selectLabel}>
        {label}
      </label>
      <select
        ref={innerRef}
        id={handlers.id}
        className={c.selectInput}
        {...handlers}>
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

export default SelectInput;

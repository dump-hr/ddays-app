import { Dispatch } from 'react';

import { toggleArrayElement } from '../../helpers';
import { Button } from '../Button';
import c from './MultipleSelectInput.module.scss';

type OptionValue = string | number;

type Option = {
  label: string;
  value: OptionValue;
};

type MultipleSelectInputProps = {
  options: Option[];
  value: OptionValue[];
  onChange: Dispatch<OptionValue[]>;
};

export const MultipleSelectInput: React.FC<MultipleSelectInputProps> = ({
  options,
  value,
  onChange,
}) => {
  const toggleSelectOption = (option: Option) => {
    const toggledArray = toggleArrayElement(value, option.value);
    onChange(toggledArray);
  };

  return (
    <div className={c.multipleSelectInputWrapper}>
      {options.map((option) => (
        <Button
          variant={value.includes(option.value) ? 'primary' : 'secondary'}
          onClick={() => toggleSelectOption(option)}
          key={option.value}>
          {option.label}
        </Button>
      ))}
    </div>
  );
};

import { Dispatch } from 'react';

import { toggleArrayElement } from '../../helpers';
import Button from '../Button';
import c from './MultipleSelectInput.module.scss';

type Option = {
  label: string;
  value: string;
};

type MultipleSelectInputProps = {
  options: Option[];
  selectedOptions: string[];
  setSelectedOptions: Dispatch<string[]>;
};

const MultipleSelectInput: React.FC<MultipleSelectInputProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const toggleSelectOption = (option: Option) => {
    const toggledArray = toggleArrayElement(selectedOptions, option.value);
    setSelectedOptions(toggledArray);
  };

  return (
    <div>
      <div className={c.multipleSelectInputWrapper}>
        {options.map((option) => (
          <Button
            variant={
              selectedOptions.includes(option.value) ? 'primary' : 'secondary'
            }
            onClick={() => toggleSelectOption(option)}
            key={option.value}>
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MultipleSelectInput;

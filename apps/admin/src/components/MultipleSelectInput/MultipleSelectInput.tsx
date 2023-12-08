import { Dispatch } from 'react';

import Button from '../Button';
import c from './MultipleSelectInput.module.scss';

type Option = {
  label: string;
  value: string;
};

type MultipleSelectInputProps = {
  label: string;
  options: Option[];
  selectedOptions: Option[];
  setSelectedOptions: Dispatch<Option[]>;
};

const MultipleSelectInput: React.FC<MultipleSelectInputProps> = ({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const toggleSelectOption = (option: Option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div>
      <p>{label}</p>
      <div className={c.multipleSelectInputWrapper}>
        {options.map((option) => (
          <Button
            variant={selectedOptions.includes(option) ? 'primary' : 'secondary'}
            onClick={() => {
              toggleSelectOption(option);
            }}
            key={option.value}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MultipleSelectInput;

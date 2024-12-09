import { useState } from 'react';
import c from './Dropdown.module.scss';
import { DropdownOption } from './DropdownOption';

type DropdownProps = {
  label: string;
  placeholder: string;
  options: DropdownOption[];
  setOption: (option: DropdownOption) => void;
  selectedOption: DropdownOption | undefined;
};

const Dropdown = ({
  label,
  placeholder,
  options,
  setOption,
  selectedOption,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  function handleOptionSelected(option: DropdownOption) {
    setOption(option);
    setIsOpen(false);
  }

  return (
    <div className={c.wrapper}>
      {label && <label className={c.label}>{label}</label>}

      <button onClick={toggle}>{selectedOption?.label || placeholder}</button>

      {isOpen && (
        <div>
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionSelected(option)}>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

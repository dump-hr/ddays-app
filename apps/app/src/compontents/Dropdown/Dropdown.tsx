import { useState } from 'react';
import c from './Dropdown.module.scss';
import { DropdownOption } from './DropdownOption';

type DropdownProps = {
  label: string;
  placeholder: string;
  options: DropdownOption[];
  setOption: () => void;
  selectedOption: DropdownOption;
};

const Dropdown = ({ label, placeholder, options }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={c.wrapper}>
      {label && <label>{label}</label>}

      <button onClick={toggle}>{placeholder}</button>

      {isOpen && (
        <div>
          {options.map((option) => (
            <button key={option.value}>{option.label}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

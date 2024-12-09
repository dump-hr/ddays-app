import { useState } from 'react';
import c from './Dropdown.module.scss';
import { DropdownOption } from './DropdownOption';
import ArrowIcon from '../../assets/icons/arrow-down-1.svg';
import clsx from 'clsx';

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

      <button
        className={clsx({ [c.mainButton]: true, [c.isOpen]: isOpen })}
        onClick={toggle}>
        {selectedOption?.label || placeholder}
        <img className={c.arrow} src={ArrowIcon} alt='arrow' />
      </button>

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

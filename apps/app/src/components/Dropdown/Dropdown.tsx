import { useRef, useState } from 'react';
import React from 'react';
import c from './Dropdown.module.scss';
import { DropdownOption } from './DropdownOption';
import ArrowIcon from 'src/assets/icons/arrow-down-1.svg';
import clsx from 'clsx';
import { useClickOutside } from 'src/hooks/UseClickOutside';

type DropdownProps = {
  label: string;
  placeholder: string;
  options: DropdownOption[];
  setOption: (option: DropdownOption) => void;
  selectedOption: DropdownOption | undefined;
  errorLabel?: string;
  showError?: boolean;
  width?: string;
  hasError?: boolean;
};

const Dropdown = ({
  label,
  placeholder,
  options,
  setOption,
  selectedOption,
  errorLabel,
  width = 'auto',
  hasError = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  function handleOptionSelected(option: DropdownOption) {
    setOption(option);
    setIsOpen(false);
  }

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const widthStyle = { width: width };
  const showError = (hasError || !selectedOption?.value) && !isOpen;

  return (
    <div className={c.wrapper} style={widthStyle} ref={dropdownRef}>
      {label && <label className={c.label}>{label}</label>}

      <button
        className={clsx({
          [c.mainButton]: true,
          [c.isOpen]: isOpen,
          [c.isError]: showError,
        })}
        onClick={toggle}>
        {selectedOption?.label || placeholder}
        <img className={c.arrow} src={ArrowIcon} alt='arrow' />
      </button>

      {showError && <div className={c.errorLabel}>{errorLabel}</div>}

      {isOpen && (
        <div className={c.optionsWrapper}>
          <div className={c.innerContainer}>
            {options.map((option, i) => (
              <React.Fragment key={option.value}>
                {i !== 0 && <div className={c.divider} key={i}></div>}
                <button
                  disabled={option.value === selectedOption?.value}
                  className={clsx({
                    [c.option]: true,
                    [c.selected]: option.value === selectedOption?.value,
                  })}
                  key={option.value}
                  onClick={() => handleOptionSelected(option)}>
                  {option.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

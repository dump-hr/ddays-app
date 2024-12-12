import { useRef, useState } from 'react';
import c from './Dropdown.module.scss';
import { DropdownOption } from './DropdownOption';
import ArrowIcon from '../../assets/icons/arrow-down-1.svg';
import clsx from 'clsx';
import { useClickOutside } from '../../hooks/useClickOutside';

type DropdownProps = {
  label: string;
  placeholder: string;
  options: DropdownOption[];
  setOption: (option: DropdownOption) => void;
  selectedOption: DropdownOption | undefined;
  errorLabel?: string;
  showError?: boolean;
  setShowError?: (showError: boolean) => void;
  width?: string;
};

const Dropdown = ({
  label,
  placeholder,
  options,
  setOption,
  selectedOption,
  errorLabel,
  showError,
  setShowError,
  width = 'auto',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggle = () => {
    if (showError && setShowError) setShowError(false);
    setIsOpen(!isOpen);
  };

  function handleOptionSelected(option: DropdownOption) {
    setOption(option);
    setIsOpen(false);
  }

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const widthStyle = { width: width };

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
              <>
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
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

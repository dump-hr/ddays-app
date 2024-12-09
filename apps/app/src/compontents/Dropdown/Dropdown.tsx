import c from './Dropdown.module.scss';
import { DropdownOption } from './DropdownOption';

type DropdownProps = {
  label: string;
  placeholder: string;
  options: DropdownOption[];
};

const Dropdown = ({ label, placeholder, options }: DropdownProps) => {
  return (
    <div className={c.wrapper}>
      {label && <label>{label}</label>}
      <button>{placeholder}</button>
      <div>
        {options.map((option) => (
          <button key={option.value}>{option.label}</button>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;

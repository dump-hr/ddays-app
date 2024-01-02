import c from './Checkbox.module.scss';

type CheckboxProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox: React.FC<CheckboxProps> = ({ label, ...handlers }) => {
  return (
    <label className={c.checkboxContainer}>
      <input type='checkbox' {...handlers} className={c.checkbox} />
      <span className={c.checkmark}></span>
      {label}
    </label>
  );
};

export default Checkbox;

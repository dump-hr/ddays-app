import c from './Checkbox.module.scss';

type CheckboxProps = {
  name: string;
  checked: boolean;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
} & Omit<React.HTMLProps<HTMLInputElement>, 'onChange'>;
export const Checkbox = ({ name, checked, label, onChange }: CheckboxProps) => {
  return (
    <>
      <div className={c.checkbox}>
        <input
          type='checkbox'
          checked={checked}
          name={name}
          onChange={onChange}
        />
        <label>{label}</label>
      </div>
    </>
  );
};

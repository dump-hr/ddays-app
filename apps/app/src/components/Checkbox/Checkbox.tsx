import c from './Checkbox.module.scss';

type CheckboxProps = {
  name: string;
  checked: boolean;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
} & Omit<React.HTMLProps<HTMLInputElement>, 'onChange'>;
export const Checkbox = ({ name, checked, label, onChange }: CheckboxProps) => {
  const id = `checkbox-${name}`;
  return (
    <>
      <div className={c.checkbox}>
        <input
          type='checkbox'
          id={id}
          checked={checked}
          name={name}
          onChange={onChange}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    </>
  );
};

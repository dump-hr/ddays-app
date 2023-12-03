import Button from "../Button";
import c from "./MultipleSelectInput.module.scss";

type Option = {
  label: string;
  value: string;
};

type MultipleSelectInputProps = {
  label: string;
  options: Option[];
  selectedOptions: Option[];
  toggleSelectOption: (option: Option) => void;
};

const MultipleSelectInput: React.FC<MultipleSelectInputProps> = ({
  label,
  options,
  selectedOptions,
  toggleSelectOption,
}) => {
  return (
    <div>
      <p>{label}</p>
      <div className={c.multipleSelectInputWrapper}>
        {options.map((option) => (
          <Button
            variant={selectedOptions.includes(option) ? "primary" : "secondary"}
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

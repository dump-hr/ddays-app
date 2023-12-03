import Button from "../Button";
import c from "./MultipleSelectInput.module.scss";

type MultipleSelectInputProps = {
  label: string;
  options: string[];
  selectedOptions: string[];
  toggleSelectOption: (option: string) => void;
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
            key={option}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MultipleSelectInput;

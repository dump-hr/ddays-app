import { useState } from "react";
import Button from "../Button";
import c from "./MultipleSelectInput.module.scss";

type MultipleSelectInputProps = {
  label: string;
  options: {
    value: string;
    label: string;
  }[];
  selectedOptios?: {
    value: string;
    label: string;
  }[];
  toggleSelectOption: (option: string) => void;
};

const MultipleSelectInput: React.FC<MultipleSelectInputProps> = ({
  label,
  options,
  selectedOptios,
  toggleSelectOption,
}) => {
  const [selected, setSelected] = useState(selectedOptios || []);
  return (
    <div>
      <p>{label}</p>
      <div className={c.multipleSelectInputWrapper}>
        {options.map((option) => (
          <Button
            onClick={() => toggleSelectOption(option.label)}
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

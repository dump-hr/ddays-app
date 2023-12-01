import { useState } from "react";
import Input from "../../components/Input";
import MultipleSelectInput from "../../components/MultipleSelectInput";
import SelectInput from "../../components/SelectInput";

const options = ["Guest", "User", "Admin"];

const GuestPage = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleSelectOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  console.log(selectedOptions);

  return (
    <div>
      <h1>Guest Page</h1>
      <SelectInput label="Uloga" options={["Guest", "User"]} />
      <Input type="date" />
      <Input type="datetime-local" />

      <MultipleSelectInput
        label="Multiple select"
        options={options}
        toggleSelectOption={toggleSelectOption}
      />
    </div>
  );
};

export default GuestPage;

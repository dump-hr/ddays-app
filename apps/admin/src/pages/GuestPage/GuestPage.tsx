import { useState } from "react";
import Input from "../../components/Input";
import MultipleSelectInput from "../../components/MultipleSelectInput";
import SelectInput from "../../components/SelectInput";

const options = [
  "Guest",
  "User",
  "Admin",
  "Super admin",
  "This",
  "That",
  "Something else",
];

const GuestPage = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleSelectOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

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
        selectedOptions={selectedOptions}
      />
    </div>
  );
};

export default GuestPage;

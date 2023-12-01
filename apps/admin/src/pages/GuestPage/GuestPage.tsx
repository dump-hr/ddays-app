import { useState } from "react";
import Input from "../../components/Input";
import MultipleSelectInput from "../../components/MultipleSelectInput";
import SelectInput from "../../components/SelectInput";

const options = ["Guest", "User", "Admin"];

const GuestPage = () => {
  // const [selectedOptions, setSelectedOptions] = useState(string[]);

  // const toggleSelectOption = (option: string) => {
  //   setSelectedOptions((prev) => {
  //     if (prev.includes(option)) {
  //       return prev.filter((item) => item !== option);
  //     } else {
  //       return [...prev, option];
  //     }
  //   });
  // };

  // console.log(selectedOptions);
  return (
    <div>
      <h1>Guest Page</h1>
      <SelectInput label="Uloga" options={["Guest", "User"]} />
      <Input type="date" />
      <Input type="datetime-local" />

      {/* <MultipleSelectInput
        label="Multiple select"
        options={options}
        toggleSelectOption={toggleSelectOption}
        selectedOptios={selectedOptions}
      /> */}
    </div>
  );
};

export default GuestPage;

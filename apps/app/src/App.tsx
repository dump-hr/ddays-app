import { useState } from 'react';
import Dropdown from './compontents/Dropdown/Dropdown';
import { DropdownOption } from './compontents/Dropdown/DropdownOption';

const options: DropdownOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

function App() {
  const [selectedOption, setSelectedOption] = useState(
    undefined as DropdownOption | undefined,
  );

  return (
    <>
      <Dropdown
        label='Hello'
        placeholder='World'
        options={options}
        setOption={(option: DropdownOption) => setSelectedOption(option)}
        selectedOption={selectedOption}
      />
    </>
  );
}

export default App;

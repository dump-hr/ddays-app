import { useState } from 'react';
import Dropdown from './compontents/Dropdown/Dropdown';
import { DropdownOption } from './compontents/Dropdown/DropdownOption';

const options: DropdownOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
  { value: '6', label: 'Option 6' },
  { value: '7', label: 'Option 7' },
  { value: '8', label: 'Option 8' },
  { value: '9', label: 'Option 9' },
  { value: '10', label: 'Option 10' },
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

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
  const [selectedOption1, setSelectedOption1] = useState(
    undefined as DropdownOption | undefined,
  );
  const [selectedOption2, setSelectedOption2] = useState(
    undefined as DropdownOption | undefined,
  );

  return (
    <>
      <h1>Dropdown Komponenta Test</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis
        blanditiis corporis sunt molestias ipsum reprehenderit, sint natus
        quisquam similique, impedit officiis vero! Unde et sapiente, temporibus
        iusto quas saepe voluptatibus.
      </p>
      <Dropdown
        label='Hello'
        placeholder='World'
        options={options}
        setOption={(option: DropdownOption) => setSelectedOption1(option)}
        selectedOption={selectedOption1}
        errorLabel='Error'
        width='500px'
      />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste doloribus
        provident corporis ea perspiciatis nulla repellat ad aspernatur
        laudantium eius voluptate soluta, dignissimos, a impedit dolor maxime
        corrupti et debitis?
      </p>
      <Dropdown
        label='Hello'
        placeholder='World'
        options={options}
        setOption={(option: DropdownOption) => setSelectedOption2(option)}
        selectedOption={selectedOption2}
        errorLabel='Error'
        width='500px'
      />
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui excepturi
        provident possimus corrupti quam, cum voluptatem eaque in accusamus
        mollitia iure reprehenderit, ullam fugit natus ipsam dolore perspiciatis
        adipisci perferendis!
      </p>
    </>
  );
}

export default App;

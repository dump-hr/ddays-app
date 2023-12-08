import { useState } from 'react';
import Input from '../../components/Input';
import MultipleSelectInput from '../../components/MultipleSelectInput';
import SelectInput from '../../components/SelectInput';
import AvatarIcon from '../../components/AvatarIcon';

type Option = {
  label: string;
  value: string;
};

const options = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
  { label: 'Option 4', value: 'option-4' },
  { label: 'Option 5', value: 'option-5' },
  { label: 'Option 6', value: 'option-6' },
  { label: 'Option 7', value: 'option-7' },
  { label: 'Option 8', value: 'option-8' },
  { label: 'Option 9', value: 'option-9' },
  { label: 'Option 10', value: 'option-10' },
  { label: 'Option 11', value: 'option-11' },
  { label: 'Option 12', value: 'option-12' },
  { label: 'Option 13', value: 'option-13' },
  { label: 'Option 14', value: 'option-14' },
  { label: 'Option 15', value: 'option-15' },
  { label: 'Option 16', value: 'option-16' },
  { label: 'Option 17', value: 'option-17' },
  { label: 'Option 18', value: 'option-18' },
  { label: 'Option 19', value: 'option-19' },
  { label: 'Option 20', value: 'option-20' },
  { label: 'Option 21', value: 'option-21' },
  { label: 'Option 22', value: 'option-22' },
  { label: 'Option 23', value: 'option-23' },
  { label: 'Option 24', value: 'option-24' },
  { label: 'Option 25', value: 'option-25' },
  { label: 'Option 26', value: 'option-26' },
  { label: 'Option 27', value: 'option-27' },
  { label: 'Option 28', value: 'option-28' },
  { label: 'Option 29', value: 'option-29' },
  { label: 'Option 30', value: 'option-30' },
  { label: 'Option 31', value: 'option-31' },
  { label: 'Option 32', value: 'option-32' },
  { label: 'Option 33', value: 'option-33' },
];

const GuestPage = () => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  return (
    <div>
      <h1>Guest Page</h1>
      <SelectInput label='Uloga' options={['Guest', 'User']} />
      <Input type='date' />
      <Input type='datetime-local' />

      <MultipleSelectInput
        label='Multiple select'
        options={options}
        setSelectedOptions={setSelectedOptions}
        selectedOptions={selectedOptions}
      />

      <AvatarIcon width={50} height={50} avatarId='oneEyedDevil' />
    </div>
  );
};

export default GuestPage;

import { useState } from 'react';
import { Input } from './components/Input';

function App() {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');

  return (
    <>
      <p>DUMP Days 2025 App</p>
      <div className='wrapper'>
        <Input
          type='password'
          placeholder='Input'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Input
          placeholder='Input'
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
        />
      </div>
    </>
  );
}

export default App;

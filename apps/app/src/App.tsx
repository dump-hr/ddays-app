import { useState } from 'react';
import Button from './components/Button';
import ToggleButton from './components/ToggleButton';

function App() {
  const [toggled, setToggled] = useState(false);
  return (
    <>
      <p>DUMP Days 2025 App</p>
      <Button>Click me</Button>
      <ToggleButton toggled={toggled} onClick={() => setToggled(!toggled)} />
    </>
  );
}

export default App;

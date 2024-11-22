import { useState } from 'react';
import Button from './components/Button';
import ToggleButton from './components/ToggleButton';
import Notification from './components/Notification';

function App() {
  const [toggled, setToggled] = useState(false);
  return (
    <div>
      <p>DUMP Days 2025 App</p>
      {/* <Button>Click me</Button>
      <ToggleButton toggled={toggled} onClick={() => setToggled(!toggled)} /> */}
      <Notification
        title={'Došle su pizze'}
        content={
          'Dobar tek i pizzeria Mirakul nas časte pizzama, skupi svoju krišku u akvariju. Dobar tek i pizzeria Mirakul nas pizzama, skupi svoju krišku u akvariju. Dobar tek i pizzeria Mirakul nas časte pizzama, skupi svoju krišku u akvariju. Dobar tek i pizzeria Mirakul nas pizzama, skupi svoju krišku u akvariju.'
        }
        time={'19 min ago'}
      />
    </div>
  );
}

export default App;

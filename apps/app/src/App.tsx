import { useState } from 'react';
import Button from './components/Button';
import ToggleButton from './components/ToggleButton';
import Notification from './components/Notification';

function App() {
  const [toggled, setToggled] = useState(false);
  return (
    <div>
      <p>DUMP Days 2025 App</p>
      <br />
      <Button variant={'beige'}>Click me</Button>
      <Button variant={'beige'}>Click me</Button>
      <Button variant={'beige'} active>
        Click me
      </Button>
      <Button variant={'orange'}>Click me</Button>
      <Button variant={'orange'}>Click me</Button>
      <Button variant={'orange'} active>
        Click me
      </Button>
      <Button variant={'black'}>Click me</Button>
      <Button variant={'black'}>Click me</Button>
      <Button variant={'black'} active>
        Click me
      </Button>
      <ToggleButton toggled={toggled} onClick={() => setToggled(!toggled)} />
      <br />
      <br />
      <br />
      <Notification
        title='Došle su pizze'
        content={'Dobar tek i pizzeria Mirakul nas časte pizzama'}
        time={'19 min ago'}
      />

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

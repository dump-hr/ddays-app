import { useState } from 'react';

import { useEventGetAll } from '../api/event/useEventGetAll';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { EventForm } from '../forms/EventForm';

const EventPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEditId, setEventToEditId] = useState<number>();

  const events = useEventGetAll();

  if (events.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEventToEditId(undefined);
        }}>
        <EventForm
          id={eventToEditId}
          onSuccess={() => {
            setIsModalOpen(false);
            setEventToEditId(undefined);
          }}
        />
      </Modal>

      <Button variant='primary' onClick={() => setIsModalOpen(true)}>
        New
      </Button>

      <Table
        data={events.data}
        actions={[
          {
            label: 'Uredi',
            action: (event) => {
              setEventToEditId(event.id);
              setIsModalOpen(true);
            },
          },
          {
            label: 'Obriši',
            action: () => {
              if (confirm('Jesi li siguran?')) {
                return;
              }
            },
          },
        ]}
      />
    </>
  );
};

export default EventPage;

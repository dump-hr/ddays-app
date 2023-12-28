import { EventPlace, EventTheme, EventType } from '@ddays-app/types';
import { useEffect, useState } from 'react';

import { useCreateEvent } from '../../api/useCreateEvent';
import { useDeleteEvent } from '../../api/useDeleteEvent';
import { useEditEvents } from '../../api/useEditEvent';
import { useFetchEvents } from '../../api/useFetchEvents';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import AddEditEventModal from './AddEditEventModal';
import c from './ModalStyles.module.scss';

const headers = [
  'Id',
  'Ime',
  'Opis',
  'Tip',
  'Tema',
  'Mjesto',
  'Početak',
  'Kraj',
  'Akcije',
];

type TableDataRow = {
  id: number;
  name: string;
  description: string;
  eventType: string;
  eventTheme: string;
  eventPlace: string;
  startsAt: string;
  endsAt: string;
};

type Event = {
  id: number;
  name: string;
  description: string;
  eventType: EventType;
  eventTheme: EventTheme;
  eventPlace: EventPlace;
  startsAt: string;
  endsAt: string;
  maxParticipants: number;
  requirements: string;
  footageLink: string;
  codeId: number;
};

const EventsPage = () => {
  const [addEventModalIsOpen, setAddEventModalIsOpen] = useState(false);
  const [deleteEventModalIsOpen, setDeleteEventModalIsOpen] = useState(false);
  const [editEventModalIsOpen, setEditEventModalIsOpen] = useState(false);

  const [tableData, setTableData] = useState<TableDataRow[]>([]);

  const { mutate: createEvent } = useCreateEvent();
  const { mutate: deleteEvent } = useDeleteEvent();
  const { mutate: editEvent } = useEditEvents();
  const { data: events } = useFetchEvents();

  const buttonActions = [
    {
      label: 'Uredi',
      action: (row: object) => {
        console.log('Uredi', row);

        const data = findEventById((row as Event).id);
        setModalData(data);

        toggleModal('edit');
      },
    },
    {
      label: 'Obriši',
      action: (row: object) => {
        console.log('Obriši', row);

        const data = findEventById((row as Event).id);
        setModalData(data);

        toggleModal('delete');
      },
    },
  ];

  useEffect(() => {
    if (events) {
      setTableData([]);
      events.forEach((event) => {
        const tableRow: TableDataRow = {
          id: event.id,
          name: event.name,
          description: event.description,
          eventType: event.eventType,
          eventTheme: event.eventTheme,
          eventPlace: event.eventPlace,
          startsAt: formatDate(event.startsAt),
          endsAt: formatDate(event.endsAt),
        };
        setTableData((prevData) => [...prevData, tableRow]);
      });
    }
  }, [events]);

  function setModalData(data: Event) {
    localStorage.setItem('modalData', JSON.stringify(data));
  }

  function getModalData() {
    const data = localStorage.getItem('modalData');
    if (data) {
      return JSON.parse(data) as Event;
    }
    return {} as Event;
  }

  function formatDate(date: string) {
    const dateObj = new Date(date);

    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();

    const hours =
      dateObj.getUTCHours() < 10
        ? `0${dateObj.getUTCHours()}`
        : dateObj.getUTCHours();

    const minutes =
      dateObj.getUTCMinutes() < 10
        ? `0${dateObj.getUTCMinutes()}`
        : dateObj.getUTCMinutes();

    return `${day}.${month}.${year}. u ${hours}:${minutes}`;
  }

  function findEventById(id: number) {
    const event = events?.find((event) => event.id === id) as Event;
    if (event) {
      return event;
    }
    return {} as Event;
  }

  function toggleModal(modal: 'add' | 'delete' | 'edit') {
    if (addEventModalIsOpen || deleteEventModalIsOpen || editEventModalIsOpen) {
      clearModalData();
    }

    switch (modal) {
      case 'add':
        setAddEventModalIsOpen(!addEventModalIsOpen);
        break;
      case 'delete':
        setDeleteEventModalIsOpen(!deleteEventModalIsOpen);
        break;
      case 'edit':
        setEditEventModalIsOpen(!editEventModalIsOpen);
        break;
    }
  }

  function clearModalData() {
    setModalData({} as Event);
  }

  function createEventHandler() {
    const event = getModalData();

    const eventToCreate = {
      ...event,
      footageLink: 'https://www.youtube.com/watch?v=3f9Y5fjw2G8',
      codeId: 1,
    };

    console.log(eventToCreate);

    createEvent(eventToCreate);
    clearModalData();
    setAddEventModalIsOpen(false);
  }

  function deleteEventHandler() {
    deleteEvent(getModalData().id);
    setDeleteEventModalIsOpen(false);
    clearModalData();
  }

  async function editEventHandler() {
    const editedEvent = getModalData();

    console.log(editedEvent);

    editEvent(editedEvent);
    setEditEventModalIsOpen(false);
    clearModalData();
  }

  function editModalData(key: string, value: string | number) {
    console.log(key, value);
    setModalData({ ...getModalData(), [key]: value });
  }

  const DeleteEventModal = () => {
    return (
      <Modal
        isOpen={deleteEventModalIsOpen}
        toggleModal={() => toggleModal('delete')}>
        <h3 className={c.modalTitle}>Obriši event</h3>
        <p className={c.modalSubtitle}>{getModalData().name}</p>
        <p>Jesi li siguran da želiš izbrisati ovaj event?</p>

        <Button
          variant='secondary'
          onClick={() => deleteEventHandler()}
          style={{ marginBottom: '20px' }}>
          Obriši
        </Button>
      </Modal>
    );
  };

  return (
    <>
      <Table headers={headers} data={tableData} buttonActions={buttonActions} />
      <Button style={{ marginTop: '20px' }} onClick={() => toggleModal('add')}>
        Dodaj event
      </Button>
      <button
        onClick={() =>
          console.log(events![0].startsAt, formatDate(events![0].startsAt))
        }>
        cl
      </button>

      <AddEditEventModal
        isOpen={addEventModalIsOpen}
        toggle={() => toggleModal('add')}
        title='Dodaj event'
        actionButtonHandler={createEventHandler}
        actionButtonText='Dodaj Event'
        onInputChange={editModalData}
      />

      <AddEditEventModal
        isOpen={editEventModalIsOpen}
        toggle={() => toggleModal('edit')}
        title='Uredi event'
        actionButtonHandler={editEventHandler}
        actionButtonText='Spremi promjene'
        onInputChange={editModalData}
        modalData={getModalData()}
      />

      <DeleteEventModal />
    </>
  );
};

export default EventsPage;

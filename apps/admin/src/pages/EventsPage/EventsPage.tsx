import { EventPlace, EventTheme, EventType } from '@ddays-app/types';
import { useEffect, useState } from 'react';

import { useCreateEvents } from '../../api/useCreateEvents';
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
};

type DetailedEvent = Event & {
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

  const { mutate: createEvent } = useCreateEvents();
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

    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    const hours =
      dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours();

    const minutes =
      dateObj.getMinutes() < 10
        ? `0${dateObj.getMinutes()}`
        : dateObj.getMinutes();

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
    const newEvent = getModalData();

    const eventToCreate = {
      name: newEvent.name,
      description: newEvent.description,
      eventType: newEvent.eventType as EventType,
      eventTheme: newEvent.eventTheme as EventTheme,
      eventPlace: newEvent.eventPlace as EventPlace,
      startsAt: newEvent.startsAt,
      endsAt: newEvent.endsAt,
      requirements: 'Nema',
      footageLink: 'https://www.youtube.com/watch?v=3f9Y5fjw2G8',
      maxParticipants: 10,
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
    const eventToEdit = findEventById(editedEvent.id) as DetailedEvent;

    const event = {
      ...eventToEdit,
      name: editedEvent.name,
      description: editedEvent.description,
      startsAt: editedEvent.startsAt,
      endsAt: editedEvent.endsAt,
      eventType: EventType.Lecture,
      eventTheme: EventTheme.Dev,
      eventPlace: EventPlace.Online,
      requirements: 'Nema',
      footageLink: 'https://www.youtube.com/watch?v=3f9Y5fjw2G8',
      codeId: 1,
    };

    console.log('event', JSON.stringify(event));

    editEvent(event); // trazi prosireni event
    setEditEventModalIsOpen(false);
    clearModalData();
  }

  function editModalData(key: string, value: string) {
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

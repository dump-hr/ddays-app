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
import TimeHelper from './TimeHelper';

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
        const data = findEventById((row as Event).id);
        setModalData(data);
        toggleModal('edit');
      },
    },
    {
      label: 'Obriši',
      action: (row: object) => {
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
          startsAt: TimeHelper.formatDate(event.startsAt),
          endsAt: TimeHelper.formatDate(event.endsAt),
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
      codeId: 1, // TODO: generate code
    };

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

    editEvent(editedEvent);
    setEditEventModalIsOpen(false);
    clearModalData();
  }

  function editModalData(key: string, value: string | number) {
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

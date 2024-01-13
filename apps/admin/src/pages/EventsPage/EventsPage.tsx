import { getCreateEventDto } from '@ddays-app/types';
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
  startsAt: string;
  endsAt: string;
};

type Event = InstanceType<ReturnType<typeof getCreateEventDto>> & {
  id: number;
};

const EventsPage = () => {
  const [addEventModalIsOpen, setAddEventModalIsOpen] = useState(false);
  const [deleteEventModalIsOpen, setDeleteEventModalIsOpen] = useState(false);
  const [editEventModalIsOpen, setEditEventModalIsOpen] = useState(false);
  const [confirmCloseModalIsOpen, setConfirmCloseModalIsOpen] = useState(false);

  const [tableData, setTableData] = useState<TableDataRow[]>([]);

  const { mutate: createEvent } = useCreateEvent();
  const { mutate: deleteEvent } = useDeleteEvent();
  const { mutate: editEvent } = useEditEvents();
  const { data: fetchedEvents } = useFetchEvents();

  const [events, setEvents] = useState<Event[] | undefined>(undefined);
  const [modalData, setModalData] = useState<Event>({} as Event);

  const buttonActions = [
    {
      label: 'Uredi',
      action: (row: TableDataRow) => {
        const data = findEventById((row as Event).id);
        setModalData(data);
        toggleModal('edit');
      },
    },
    {
      label: 'Obriši',
      action: (row: TableDataRow) => {
        const data = findEventById((row as Event).id);
        setModalData(data);
        toggleModal('delete');
      },
    },
  ];

  useEffect(() => {
    if (fetchedEvents) {
      const modifiedEvents = fetchedEvents.map((event) => {
        return {
          ...event,
          startsAt: TimeHelper.addHours(event.startsAt),
          endsAt: TimeHelper.addHours(event.endsAt),
        } as Event;
      });

      setEvents(modifiedEvents);
    }
  }, [fetchedEvents]);

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
          startsAt: TimeHelper.formatDate(event.startsAt),
          endsAt: event.endsAt ? TimeHelper.formatDate(event.endsAt) : '',
        };
        setTableData((prevData) => [...prevData, tableRow]);
      });
    }
  }, [events]);

  /*
  function setModalData(data: Event) {
    localStorage.setItem('modalData', JSON.stringify(data));
  }
  */
  /*
  function getModalData() {
    const data = localStorage.getItem('modalData');
    if (data) {
      return JSON.parse(data) as Event;
    }
    return {} as Event;
  }
  */

  function findEventById(id: number) {
    const event = events?.find((event) => event.id === id) as Event;
    if (event) {
      return event;
    }
    return {} as Event;
  }

  function toggleModal(modal: 'add' | 'delete' | 'edit') {
    const filteredProps = Object.entries(modalData).filter(
      ([, value]) => value !== null && value !== '',
    );

    const modalIsEmpty = filteredProps.length === 0;

    if (!modalIsEmpty && (addEventModalIsOpen || editEventModalIsOpen)) {
      setConfirmCloseModalIsOpen(true);
      return;
    }

    if (deleteEventModalIsOpen) {
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

  function createEventHandler(data: object) {
    const eventToCreate = data as Event;
    console.log('eventToCreate', eventToCreate);
    if (!eventToCreate) return;

    createEvent(eventToCreate);

    clearModalData();
    setAddEventModalIsOpen(false);
  }

  function deleteEventHandler() {
    deleteEvent(modalData.id);
    setDeleteEventModalIsOpen(false);
    clearModalData();
  }

  async function editEventHandler(data: object) {
    const editedEvent = data as Event;
    console.log('editedEvent', editedEvent);
    editEvent(editedEvent);

    setEditEventModalIsOpen(false);
    clearModalData();
  }

  const DeleteEventModal = () => {
    return (
      <Modal
        isOpen={deleteEventModalIsOpen}
        toggleModal={() => toggleModal('delete')}>
        <h3 className={c.modalTitle}>Obriši event</h3>
        <p className={c.modalSubtitle}>{modalData.name}</p>
        <p>Jesi li siguran da želiš obrisati ovaj event?</p>

        <div style={{ display: 'flex', gap: '20px' }}>
          <Button
            variant='primary'
            onClick={() => setDeleteEventModalIsOpen(false)}>
            Odustani
          </Button>
          <Button variant='secondary' onClick={() => deleteEventHandler()}>
            Obriši
          </Button>
        </div>
      </Modal>
    );
  };

  const ConfirmCloseModal = () => {
    function handleModalClose(closeAll: boolean) {
      if (closeAll) {
        setAddEventModalIsOpen(false);
        setEditEventModalIsOpen(false);
        clearModalData();
      }
      setConfirmCloseModalIsOpen(false);
    }

    return (
      <Modal
        isOpen={confirmCloseModalIsOpen}
        toggleModal={() => setConfirmCloseModalIsOpen(false)}>
        <h3 className={c.modalTitle}>Zatvaranje modala</h3>
        <p>
          Jesi li siguran za želiš odustati od unosa podataka?
          <br /> Podaci neće biti spremljeni.
        </p>

        <div style={{ display: 'flex', gap: '20px' }}>
          <Button variant='primary' onClick={() => handleModalClose(false)}>
            Ne
          </Button>
          <Button variant='secondary' onClick={() => handleModalClose(true)}>
            Da
          </Button>
        </div>
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
      />

      <AddEditEventModal
        isOpen={editEventModalIsOpen}
        toggle={() => toggleModal('edit')}
        title='Uredi event'
        actionButtonHandler={editEventHandler}
        actionButtonText='Spremi promjene'
        modalData={modalData}
      />

      <DeleteEventModal />
      <ConfirmCloseModal />
    </>
  );
};

export default EventsPage;

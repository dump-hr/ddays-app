import { EventPlace, EventTheme, EventType } from '@ddays-app/types';
import { useEffect, useState } from 'react';

import { useCreateEvents } from '../../api/useCreateEvents';
import { useDeleteEvent } from '../../api/useDeleteEvent';
import { useFetchEvents } from '../../api/useFetchEvents';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import SelectInput from '../../components/SelectInput';
import Table from '../../components/Table';
import c from './EventsPage.module.scss';

const eventTypes: string[] = Object.values(EventType);
const themeTypes: string[] = Object.values(EventTheme);
const placeTypes: string[] = Object.values(EventPlace);

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

/*
const data = [
  {
    id: 1,
    name: 'Kampiranje',
    description: 'Kampiranje u prirodi',
    type: 'Kampiranje',
    theme: 'Priroda',
    place: 'Plitvice',
    start: '2021-06-01',
    end: '2021-06-10',
  },
  {
    id: 2,
    name: 'Krstarenje',
    description: 'Krstarenje Jadranom',
    type: 'Krstarenje',
    theme: 'Priroda',
    place: 'Jadran',
    start: '2021-06-01',
    end: '2021-06-10',
  },
  {
    id: 3,
    name: 'Izlet',
    description: 'Izlet u prirodu',
    type: 'Izlet',
    theme: 'Priroda',
    place: 'Plitvice',
    start: '2021-06-01',
    end: '2021-06-10',
  },
  {
    id: 4,
    name: 'Penjanje',
    description: 'Penjanje po stijenama',
    type: 'Penjanje',
    theme: 'Priroda',
    place: 'Plitvice',
    start: '2021-06-01',
    end: '2021-06-10',
  },
];
*/

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
  eventType: string;
  eventTheme: string;
  eventPlace: string;
  startsAt: string;
  endsAt: string;
  maxParticipants: number;
};

const EventsPage = () => {
  const [addEventModalIsOpen, setAddEventModalIsOpen] = useState(false);
  const [deleteEventModalIsOpen, setDeleteEventModalIsOpen] = useState(false);
  const [editEventModalIsOpen, setEditEventModalIsOpen] = useState(false);

  //const [modalData, setModalData] = useState({} as Event);

  const [tableData, setTableData] = useState<TableDataRow[]>([]);

  const { mutate: createEvent } = useCreateEvents();
  const { mutate: deleteEvent } = useDeleteEvent();
  const { data: events } = useFetchEvents();

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

  const buttonActions = [
    {
      label: 'Uredi',
      action: (row: object) => {
        console.log('Uredi', row);

        const data = getEventById((row as Event).id);
        setModalData(data);

        toggleEditEventModal();
      },
    },
    {
      label: 'Obriši',
      action: (row: object) => {
        console.log('Obriši', row);

        const data = getEventById((row as Event).id);
        setModalData(data);

        toggleDeleteEventModal();
      },
    },
  ];

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

  function getEventById(id: number) {
    const event = events?.find((event) => event.id === id) as Event;
    if (event) {
      return event;
    }
    return {} as Event;
  }

  useEffect(() => {
    if (events) {
      setTableData([]);
      events.forEach((event) => {
        const tableRow: TableDataRow = {
          id: event.id,
          name: event.name,
          description: event.description,
          eventType: '',
          eventTheme: '',
          eventPlace: '',
          startsAt: formatDate(event.startsAt),
          endsAt: formatDate(event.endsAt),
        };
        setTableData((prevData) => [...prevData, tableRow]);
      });
    }
  }, [events]);

  function toggleAddEventModal() {
    if (addEventModalIsOpen) {
      clearModalData();
    }
    setAddEventModalIsOpen(!addEventModalIsOpen);
  }

  function toggleDeleteEventModal() {
    if (deleteEventModalIsOpen) {
      clearModalData();
    }
    setDeleteEventModalIsOpen(!deleteEventModalIsOpen);
  }

  function toggleEditEventModal() {
    if (editEventModalIsOpen) {
      clearModalData();
    }
    setEditEventModalIsOpen(!editEventModalIsOpen);
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

    createEvent(eventToCreate);
    clearModalData();
    setAddEventModalIsOpen(false);
  }

  function deleteEventHandler() {
    deleteEvent(getModalData().id);
    setDeleteEventModalIsOpen(false);
    clearModalData();
  }

  function editEventHandler() {}

  function editModalData(
    key: string,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) {
    setModalData({ ...getModalData(), [key]: event.target.value });
  }

  const AddEventModal = () => {
    return (
      <Modal isOpen={addEventModalIsOpen} toggleModal={toggleAddEventModal}>
        <h3 className={c.modalTitle}>Dodaj event</h3>
        <div className={c.editModalLayout}>
          <div>
            <label htmlFor='ime'>Ime</label>
            <Input
              id='ime'
              placeholder='Unesi ime'
              defaultValue={getModalData().name}
              onChange={(e) => editModalData('name', e)}
            />
          </div>
          <div>
            <label htmlFor='opis'>Opis</label>
            <Input
              id='opis'
              placeholder='Unesi opis'
              defaultValue={getModalData().description}
              onChange={(e) => editModalData('description', e)}
            />
          </div>
          <div>
            <label htmlFor='tip'>Tip</label>
            <br />
            <SelectInput
              id='tip'
              placeholder='Unesi tip'
              options={eventTypes}
              onChange={(e) => editModalData('eventType', e)}
              label=''
              isAllowedEmpty={false}
            />
          </div>
          <div>
            <label htmlFor='tema'>Tema</label>
            <br />
            <SelectInput
              id='tema'
              placeholder='Unesi temu'
              options={themeTypes}
              onChange={(e) => editModalData('eventTheme', e)}
              label=''
              isAllowedEmpty={false}
            />
          </div>
          <div>
            <label htmlFor='mjesto'>Mjesto</label>
            <br />
            <SelectInput
              id='mjesto'
              placeholder='Unesi mjesto'
              options={placeTypes}
              onChange={(e) => editModalData('eventPlace', e)}
              label=''
              isAllowedEmpty={false}
            />
          </div>
          <br />
          <div>
            <label htmlFor='datumPocetka'>Datum početka</label>
            <Input
              type='datetime-local'
              id='datumPocetka'
              placeholder='Unesi datum početka'
              defaultValue={getModalData().startsAt}
              onChange={(e) => editModalData('startsAt', e)}
            />
          </div>
          <div>
            <label htmlFor='datumKraja'>Datum kraja</label>
            <Input
              type='datetime-local'
              id='datumKraja'
              placeholder='Unesi datum kraja'
              defaultValue={getModalData().endsAt}
              onChange={(e) => editModalData('endsAt', e)}
            />
          </div>

          <Button variant='secondary' onClick={() => createEventHandler()}>
            Dodaj Event
          </Button>
        </div>
      </Modal>
    );
  };

  const DeleteEventModal = () => {
    return (
      <Modal
        isOpen={deleteEventModalIsOpen}
        toggleModal={toggleDeleteEventModal}>
        <h3 className={c.modalTitle}>Obriši event</h3>
        <p className={c.modalSubtitle}>{getModalData().name}</p>
        <p>Jesi li siguran da želiš izbrisati ovaj event?</p>

        <Button
          variant='secondary'
          onClick={() => deleteEventHandler()}
          style={{ marginBottom: '20px' }}>
          Izbriši
        </Button>
      </Modal>
    );
  };

  const EditEventModal = () => {
    return (
      <Modal isOpen={editEventModalIsOpen} toggleModal={toggleEditEventModal}>
        <h3 className={c.modalTitle}>Uredi event</h3>
        <div className={c.editModalLayout}>
          <div>
            <label htmlFor=''>Ime</label>
            <Input
              placeholder='Unesi ime'
              defaultValue={getModalData().name}
              onChange={(e) => editModalData('name', e)}
            />
          </div>
          <div>
            <label htmlFor=''>Opis</label>
            <Input
              placeholder='Unesi opis'
              defaultValue={getModalData().description}
              onChange={(e) => editModalData('name', e)}
            />
          </div>
          <div>
            <label htmlFor=''>Tip</label>
            <Input placeholder='Unesi tip' disabled />
          </div>
          <div>
            <label htmlFor=''>Tema</label>
            <Input placeholder='Unesi temu' disabled />
          </div>
          <div>
            <label htmlFor=''>Mjesto</label>
            <Input placeholder='Unesi mjesto' disabled />
          </div>
          <br />
          <div>
            <label htmlFor=''>Datum početka</label>
            <br />
            <input
              type='datetime-local'
              defaultValue={getEventById(getModalData().id).startsAt}
              onChange={(e) => editModalData('startsAt', e)}
            />
          </div>
          <div>
            <label htmlFor=''>Datum kraja</label>
            <br />
            <input
              type='datetime-local'
              value={getEventById(getModalData().id).endsAt}
              onChange={(e) => editModalData('endsAt', e)}
            />
          </div>

          <Button variant='secondary' onClick={() => editEventHandler()}>
            Spremi promjene
          </Button>
          <button onClick={() => console.log(getModalData())}>cl</button>
        </div>
      </Modal>
    );
  };

  return (
    <>
      <Table headers={headers} data={tableData} buttonActions={buttonActions} />
      <Button style={{ marginTop: '20px' }} onClick={toggleAddEventModal}>
        Dodaj event
      </Button>

      <AddEventModal />
      <DeleteEventModal />
      <EditEventModal />
    </>
  );
};

export default EventsPage;

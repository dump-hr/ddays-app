import { EventPlace, EventTheme } from '@ddays-app/types';
import { EventType } from '@ddays-app/types';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useCreateEvents } from '../../api/useCreateEvents';
import { useDeleteEvent } from '../../api/useDeleteEvent';
import { useFetchEvents } from '../../api/useFetchEvents';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import c from './EventsPage.module.scss';

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
  type: string;
  theme: string;
  place: string;
  start: string;
  end: string;
};

type Event = {
  id: number;
  name: string;
  description: string;
  startsAt: string;
  endsAt: string;
  maxParticipants: number;
};

const EventsPage = () => {
  const [addEventModalIsOpen, setAddEventModalIsOpen] = useState(false);
  const [deleteEventModalIsOpen, setDeleteEventModalIsOpen] = useState(false);

  const [rowData, setRowData] = useState({} as Event);

  const [tableData, setTableData] = useState<TableDataRow[]>([]);
  const modalData = useRef({} as Event);

  const { mutate: createEvent } = useCreateEvents();
  const { mutate: deleteEvent } = useDeleteEvent();
  const { data: events } = useFetchEvents();

  const buttonActions = [
    {
      label: 'Uredi',
      action: (row: object) => {
        console.log('Uredi', row);
      },
    },
    {
      label: 'Obriši',
      action: (row: object) => {
        console.log('Obriši', row);
        setRowData(row as Event);
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

  useEffect(() => {
    if (events) {
      setTableData([]);
      events.forEach((event) => {
        const tableRow: TableDataRow = {
          id: event.id,
          name: event.name,
          description: event.description,
          type: '',
          theme: '',
          place: '',
          start: formatDate(event.startsAt),
          end: formatDate(event.endsAt),
        };
        setTableData((prevData) => [...prevData, tableRow]);
      });
    }
  }, [events]);

  function toggleAddEventModal() {
    setAddEventModalIsOpen(!addEventModalIsOpen);
  }

  function toggleDeleteEventModal() {
    setDeleteEventModalIsOpen(!deleteEventModalIsOpen);
  }

  function clearModalData() {
    modalData.current = {} as Event;
    //setModalData({} as Event);
  }

  function createEventHandler() {
    console.log(modalData.current);

    const exampleEvent = {
      name: 'Kampiranje',
      description: 'Kampiranje u prirodi',
      eventType: EventType.Lecture,
      eventTheme: EventTheme.Dev,
      eventPlace: EventPlace.InPerson,
      startsAt: '2021-06-01',
      endsAt: '2021-06-10',
      requirements: 'Nema',
      footageLink: 'https://www.youtube.com/watch?v=3f9Y5fjw2G8',
      maxParticipants: 10,
      codeId: 1,
    };

    createEvent(exampleEvent);
    clearModalData();
    setAddEventModalIsOpen(false);
  }

  function deleteEventHandler() {
    deleteEvent(rowData.id);
    setDeleteEventModalIsOpen(false);
  }

  const editModalData = useCallback((key: string, value: string) => {
    modalData.current = { ...modalData.current, [key]: value };
    console.log(modalData);
    //setModalData((prevData) => ({ ...prevData, [key]: value }));
  }, []);

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
              onChange={(e) => editModalData('name', e.target.value)}
              value={modalData.current.name}
            />
          </div>
          <div>
            <label htmlFor='opis'>Opis</label>
            <Input
              id='opis'
              placeholder='Unesi opis'
              onChange={(e) => editModalData('description', e.target.value)}
              value={modalData.current.description}
            />
          </div>
          <div>
            <label htmlFor='tip'>Tip</label>
            <Input id='tip' placeholder='Unesi tip' />
          </div>
          <div>
            <label htmlFor='tema'>Tema</label>
            <Input id='tema' placeholder='Unesi temu' />
          </div>
          <div>
            <label htmlFor='mjesto'>Mjesto</label>
            <Input id='mjesto' placeholder='Unesi mjesto' />
          </div>
          <br />
          <div>
            <label htmlFor='datumPocetka'>Datum početka</label>
            <Input
              id='datumPocetka'
              placeholder='Unesi datum početka'
              onChange={(e) => editModalData('start', e.target.value)}
              value={modalData.current.startsAt}
            />
          </div>
          <div>
            <label htmlFor='datumKraja'>Datum kraja</label>
            <Input
              id='datumKraja'
              placeholder='Unesi datum kraja'
              onChange={(e) => editModalData('end', e.target.value)}
              value={modalData.current.endsAt}
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
        <p className={c.modalSubtitle}>{rowData.name}</p>
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

  return (
    <>
      <Table headers={headers} data={tableData} buttonActions={buttonActions} />
      <Button style={{ marginTop: '20px' }} onClick={toggleAddEventModal}>
        Dodaj event
      </Button>
      <button onClick={() => console.log(events)}>cl</button>

      <AddEventModal />
      <DeleteEventModal />
    </>
  );
};

export default EventsPage;

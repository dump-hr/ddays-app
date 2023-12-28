import { EventPlace, EventTheme, EventType } from '@ddays-app/types';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import SelectInput from '../../components/SelectInput';
import c from './ModalStyles.module.scss';
import TimeHelper from './TimeHelper';

type ModalData = {
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

type ModalProps = {
  isOpen: boolean;
  toggle: () => void;
  title: string;
  actionButtonText: string;
  actionButtonHandler: () => void;
  onInputChange: (key: string, value: string | number) => void;
  modalData?: ModalData;
};

const eventTypes: string[] = Object.values(EventType);
const themeTypes: string[] = Object.values(EventTheme);
const placeTypes: string[] = Object.values(EventPlace);

const AddEditEventModal: React.FC<ModalProps> = ({
  isOpen,
  toggle,
  title,
  actionButtonText,
  actionButtonHandler,
  onInputChange,
  modalData,
}) => {
  function validateForm() {
    const data = JSON.parse(
      localStorage.getItem('modalData') || '',
    ) as ModalData;

    if (!data.name) {
      alert('Ime mora biti uneseno.');
      return false;
    } else if (data.name.length < 3) {
      alert('Ime mora imati barem 3 znaka.');
      return false;
    } else if (data.name.length > 50) {
      alert('Ime ne smije imati više od 50 znakova.');
      return false;
    }

    if (!data.description) {
      alert('Opis mora biti unesen.');
      return false;
    } else if (data.description.length < 5) {
      alert('Opis mora imati barem 5 znakova.');
      return false;
    } else if (data.description.length > 50) {
      alert('Opis ne smije imati više od 50 znakova.');
      return false;
    }

    if (!data.eventType) {
      alert('Tip mora biti unesen.');
      return false;
    }

    if (!data.eventTheme) {
      alert('Tema mora biti unesena.');
      return false;
    }

    if (!data.eventPlace) {
      alert('Mjesto mora biti uneseno.');
      return false;
    }

    if (!data.maxParticipants) {
      alert('Najveći broj sudionika mora biti unesen.');
      return false;
    } else if (data.maxParticipants < 0) {
      alert('Najveći broj sudionika ne smije biti manji od 0.');
      return false;
    } else if (data.maxParticipants > 1000) {
      alert('Najveći broj sudionika ne smije biti veći od 1000.');
      return false;
    }

    if (!data.requirements) {
      localStorage.setItem(
        'modalData',
        JSON.stringify({ ...data, requirements: 'Nema' }),
      );
    } else if (data.requirements.length > 500) {
      alert('Zahtjevi ne smiju imati više od 500 znakova.');
      return false;
    }

    if (!data.footageLink) {
      alert('Poveznica na video mora biti unesena.');
      return false;
    } else if (!isValidUrl(data.footageLink)) {
      alert('Poveznica nije ispravnog formata.');
      return false;
    }

    if (!data.startsAt) {
      alert('Datum početka mora biti unesen.');
      return false;
    }

    if (!data.endsAt) {
      alert('Datum kraja mora biti unesen.');
      return false;
    }

    if (new Date(data.startsAt) > new Date(data.endsAt)) {
      alert('Datum početka ne smije biti veći od datuma kraja.');
      return false;
    }

    return true;
  }

  function isValidUrl(urlString: string) {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i',
    );
    return !!urlPattern.test(urlString);
  }

  function submitHandler() {
    if (validateForm()) {
      actionButtonHandler();
    }
  }

  return (
    <Modal isOpen={isOpen} toggleModal={toggle}>
      <h3 className={c.modalTitle}>{title}</h3>
      <div className={c.editModalLayout}>
        <div>
          <label htmlFor=''>Ime</label>
          <Input
            placeholder='Unesi ime'
            defaultValue={modalData?.name || ''}
            onChange={(e) => onInputChange('name', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor=''>Opis</label>
          <Input
            placeholder='Unesi opis'
            defaultValue={modalData?.description || ''}
            onChange={(e) => onInputChange('description', e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor='tip'>Tip</label>
          <br />
          <SelectInput
            id='tip'
            placeholder='Unesi tip'
            options={eventTypes}
            defaultValue={modalData?.eventType || ''}
            onChange={(e) => onInputChange('eventType', e.target.value)}
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
            defaultValue={modalData?.eventTheme || ''}
            onChange={(e) => onInputChange('eventTheme', e.target.value)}
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
            defaultValue={modalData?.eventPlace || ''}
            onChange={(e) => onInputChange('eventPlace', e.target.value)}
            label=''
            isAllowedEmpty={false}
          />
        </div>
        <div>
          <label htmlFor='najveciBrojSudionika'>Najveći broj sudionika</label>
          <Input
            type='number'
            min={0}
            max={1000}
            id='najveciBrojSudionika'
            placeholder='Unesi broj'
            defaultValue={modalData?.maxParticipants || ''}
            onChange={(e) => onInputChange('maxParticipants', +e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='zahtjevi'>Zahtjevi</label>
          <br />
          <textarea
            name=''
            id='zahtjevi'
            defaultValue={modalData?.requirements || ''}
            onChange={(e) => onInputChange('requirements', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='poveznicaNaVideo'>Poveznica na video</label>
          <br />
          <Input
            type='text'
            id='poveznicaNaVideo'
            placeholder='Unesi poveznicu'
            defaultValue={modalData?.footageLink || ''}
            onChange={(e) => onInputChange('footageLink', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='datumPocetka'>Datum početka</label>
          <Input
            type='datetime-local'
            id='datumPocetka'
            placeholder='Unesi datum početka'
            defaultValue={TimeHelper.changeDateIsoFormat(
              modalData?.startsAt || '',
            )}
            onChange={(e) =>
              onInputChange('startsAt', TimeHelper.addHour(e.target.value))
            }
          />
        </div>
        <div>
          <label htmlFor='datumKraja'>Datum kraja</label>
          <Input
            type='datetime-local'
            id='datumKraja'
            placeholder='Unesi datum kraja'
            defaultValue={TimeHelper.changeDateIsoFormat(
              modalData?.endsAt || '',
            )}
            onChange={(e) =>
              onInputChange('endsAt', TimeHelper.addHour(e.target.value))
            }
          />
        </div>
        <br />

        <Button variant='secondary' onClick={submitHandler}>
          {actionButtonText}
        </Button>
      </div>
    </Modal>
  );
};

export default AddEditEventModal;

import { EventPlace, EventTheme, EventType } from '@ddays-app/types';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import SelectInput from '../../components/SelectInput';
import c from './ModalStyles.module.scss';

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
  function changeDateIsoFormat(iso8601: string) {
    const date = new Date(iso8601);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const simplifiedIso = `${year}-${month}-${day}T${hours}:${minutes}`;
    return simplifiedIso;
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
            defaultValue={changeDateIsoFormat(modalData?.startsAt || '')}
            onChange={(e) => onInputChange('startsAt', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='datumKraja'>Datum kraja</label>
          <Input
            type='datetime-local'
            id='datumKraja'
            placeholder='Unesi datum kraja'
            defaultValue={changeDateIsoFormat(modalData?.endsAt || '')}
            onChange={(e) => onInputChange('endsAt', e.target.value)}
          />
        </div>
        <br />

        <Button variant='secondary' onClick={actionButtonHandler}>
          {actionButtonText}
        </Button>
      </div>
    </Modal>
  );
};

export default AddEditEventModal;

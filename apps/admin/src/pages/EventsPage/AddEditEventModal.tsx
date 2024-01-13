import {
  EventTheme,
  EventType,
  getCreateEventDto,
  Question,
  QuestionType,
} from '@ddays-app/types';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '../../components/Button';
import InputHandler from '../../components/InputHandler';
import Modal from '../../components/Modal';
import c from './ModalStyles.module.scss';
import TimeHelper from './TimeHelper';

type Event = InstanceType<ReturnType<typeof getCreateEventDto>> & {
  id: number;
};

type ModalProps = {
  isOpen: boolean;
  toggle: () => void;
  title: string;
  actionButtonText: string;
  actionButtonHandler: (data: object) => void;
  modalData?: Event;
};

const eventTypes: string[] = Object.values(EventType);
const themeTypes: string[] = Object.values(EventTheme);

const AddEditEventModal: React.FC<ModalProps> = ({
  isOpen,
  toggle,
  title,
  actionButtonText,
  actionButtonHandler,
  modalData,
}) => {
  const form = useForm<FieldValues>();

  function validateForm() {
    const data = form.getValues() as Event;

    if (!data.name) {
      toast.error('Ime mora biti uneseno.');
      return false;
    }

    if (data.footageLink && !isValidUrl(data.footageLink)) {
      toast.error('Poveznica nije u ispravnom formatu.');
      return false;
    }

    if (!data.startsAt) {
      toast.error('Datum početka mora biti unesen.');
      return false;
    }

    if (data.endsAt) {
      if (new Date(data.startsAt) > new Date(data.endsAt)) {
        toast.error('Datum početka ne smije biti veći od datuma kraja.');
        return false;
      }
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
      type NullableProps<T> = {
        [K in keyof T]: T[K] | null;
      };

      const formValues = form.getValues() as NullableProps<Event>;
      const data = {
        ...formValues,
        id: modalData?.id || null,
        codeId: modalData?.codeId || null,
      };

      for (const key in data) {
        if (data[key as keyof typeof data] === '') {
          data[key as keyof typeof data] = null;
        }
      }

      actionButtonHandler(data);
      form.reset();
    }
  }

  const questions: Question[] = [
    {
      type: QuestionType.Field,
      title: 'Ime',
      id: 'name',
      defaultValue: modalData?.name || '',
      rules: { required: 'true' },
    },
    {
      type: QuestionType.Field,
      title: 'Opis',
      id: 'description',
      defaultValue: modalData?.description || '',
    },
    {
      type: QuestionType.Select,
      title: 'Tip',
      id: 'eventType',
      defaultValue: modalData?.eventType || '',
      options: eventTypes,
    },
    {
      type: QuestionType.Select,
      title: 'Tema',
      id: 'eventTheme',
      defaultValue: modalData?.eventTheme || '',
      options: themeTypes,
    },
    {
      type: QuestionType.Number,
      title: 'Najveći broj sudionika',
      id: 'maxParticipants',
      defaultValue: modalData?.maxParticipants || '',
    },
    {
      type: QuestionType.Field,
      title: 'Zahtjevi',
      id: 'requirements',
      defaultValue: modalData?.requirements || '',
    },
    {
      type: QuestionType.Field,
      title: 'Poveznica na video',
      id: 'footageLink',
      defaultValue: modalData?.footageLink || '',
    },
    {
      type: QuestionType.DateTime,
      title: 'Datum početka',
      id: 'startsAt',
      defaultValue: TimeHelper.changeDateIsoFormat(modalData?.startsAt || ''),
      rules: { required: 'true' },
    },
    {
      type: QuestionType.DateTime,
      title: 'Datum kraja',
      id: 'endsAt',
      defaultValue: TimeHelper.changeDateIsoFormat(modalData?.endsAt || ''),
    },
  ];

  function toggleAndResetData() {
    toggle();
    form.reset();
  }

  return (
    <Modal isOpen={isOpen} toggleModal={toggle}>
      <h3 className={c.modalTitle}>{title}</h3>
      <div className={c.editModalLayout}>
        {questions.map((question, i) => {
          return (
            <div key={question.id}>
              <InputHandler question={question} form={form} key={i} />
            </div>
          );
        })}
        <br />

        <Button variant='primary' onClick={() => toggleAndResetData()}>
          Odustani
        </Button>
        <Button variant='secondary' onClick={submitHandler}>
          {actionButtonText}
        </Button>
      </div>
    </Modal>
  );
};

export default AddEditEventModal;

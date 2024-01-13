import { Question, QuestionType } from '@ddays-app/types';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import FileUpload from '../../components/FileUpload';
import Input from '../../components/Input';
import InputHandler from '../../components/InputHandler';
import Modal from '../../components/Modal';

const questions: Question[] = [
  {
    type: QuestionType.Field,
    title: 'Naziv eventa',
    id: 'eventName',
    rules: {
      required: 'Obavezno!',
    },
  },
  {
    type: QuestionType.Number,
    title: 'Ocjena',
    id: 'eventScore',
    defaultValue: 10,
    rules: {
      min: { value: 0, message: 'Ocjena minimalna 0!' },
      max: { value: 10, message: 'Ocjena maksimalna 10!' },
      required: 'Obavezno unijeti broj!',
    },
  },
  {
    type: QuestionType.Date,
    title: 'Start',
    id: 'eventStart',
  },
  {
    type: QuestionType.DateTime,
    title: 'Kraj',
    id: 'eventEnd',
  },
  {
    type: QuestionType.Checkbox,
    title: 'Debakl?',
    id: 'isFail',
    defaultValue: false,
  },
];

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState<string | ArrayBuffer | null>(null);
  const form = useForm<FieldValues>();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Input placeholder='placeholder' />
      <Button onClick={toggleModal}>Open modal</Button>
      <Modal showCloseButton isOpen={isOpen} toggleModal={toggleModal}>
        <Input placeholder='Username' />
        <Input placeholder='Password' />
      </Modal>
      <Checkbox label='Some label' />
      <Checkbox label='Some other label' />
      <FileUpload
        src={src}
        label={'some label'}
        accept={'.png,.jpg'}
        setSrc={setSrc}
      />

      <button onClick={form.handleSubmit((s) => console.log(s))}>Submit</button>
      {questions.map((q) => (
        <InputHandler question={q} form={form} key={q.id} />
      ))}
    </div>
  );
};

export default HomePage;

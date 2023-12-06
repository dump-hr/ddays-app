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
    title: 'Naziv',
    id: 'firstName',
    registerValue: 'x',
  },
  {
    type: QuestionType.Number,
    title: 'Baraba',
    id: 'broj',
    registerValue: 4,
    rules: { min: 2, max: 5, required: true },
  },
  {
    type: QuestionType.Date,
    title: 'Naziv',
    id: 'datun',
  },
  {
    type: QuestionType.DateTime,
    title: 'Vrime',
    id: 'vrimeje',
  },
  {
    type: QuestionType.Checkbox,
    title: 'dali',
    id: 'salvador dali',
    registerValue: '1',
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
      <button onClick={form.handleSubmit((s) => console.log(s))}>b</button>
      <Input placeholder='placeholder' />
      <Button onClick={toggleModal}>Open modal</Button>
      <Modal isOpen={isOpen} toggleModal={toggleModal}>
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
      {questions.map((q) => (
        <InputHandler question={q} form={form} key={q.id} />
      ))}
    </div>
  );
};

export default HomePage;

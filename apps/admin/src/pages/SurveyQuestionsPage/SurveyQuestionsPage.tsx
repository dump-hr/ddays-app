import { useState } from 'react';
import { useFetchSurveyQuestions } from '../../api/SurveyQuestions/useFetchSurveyQuestions';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import {
  Question,
  QuestionType,
  SurveyQuestionInputType,
  SurveyQuestionType,
} from '@ddays-app/types';
import InputHandler from '../../components/InputHandler';
import { FieldValues, useForm } from 'react-hook-form';
import { useCreateSurveyQuestion } from '../../api/SurveyQuestions/useCreateSurveyQuestion';
import { CreateSurveyQuestionDto } from '../../types/surveyQuestionDto';

const headers = [
  'Broj',
  'Pitanje',
  'Opis',
  'Label',
  'Tip',
  'Vrsta polja za unos',
  'Akcije',
];

const questions: Question[] = [
  {
    id: 'question',
    type: QuestionType.Field,
    title: 'Pitanje',
  },
  {
    id: 'description',
    type: QuestionType.Field,
    title: 'Opis (opcionalno)',
  },
  {
    id: 'inputLabel',
    type: QuestionType.Field,
    title: 'Labela',
  },
  {
    id: 'surveyQuestionInputType',
    type: QuestionType.Select,
    title: 'Vrsta polja za unos',
    // defaultValue: SurveyQuestionInputType.Rating,
    options: [
      SurveyQuestionInputType.Input,
      SurveyQuestionInputType.Rating,
      SurveyQuestionInputType.Textarea,
    ],
  },
  {
    id: 'surveyQuestionType',
    type: QuestionType.Select,
    title: 'Vrsta pitanja',
    rules: { required: 'klosaru unesi' },
    // defaultValue: SurveyQuestionType.Company,
    options: [
      SurveyQuestionType.Company,
      SurveyQuestionType.Lecture,
      SurveyQuestionType.Workshop,
    ],
  },
];

const SurveyQuestionsPage = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const { data: surveyQuestions, isLoading } = useFetchSurveyQuestions();
  const { mutate: createSurveyQuestion } = useCreateSurveyQuestion();

  const handleCreateSurveyQuestion = (answers: CreateSurveyQuestionDto) => {
    console.log('Create survey question');
    createSurveyQuestion(answers);
  };

  const form = useForm<FieldValues>();

  const buttonActions = [
    {
      label: 'Uredi',
      action: (row: object) =>
        console.log('Edit survey question with id: ', row),
    },
    {
      label: 'Obriši',
      action: (row: object) =>
        console.log('Delete survey question with id: ', row),
    },
  ];

  const toggleAddQuestionModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal isOpen={isOpenAddModal} toggleModal={toggleAddQuestionModal}>
        <Button
          onClick={form.handleSubmit((s) =>
            handleCreateSurveyQuestion(s as CreateSurveyQuestionDto),
          )}>
          Submit
        </Button>
        {questions.map((q) => (
          <InputHandler question={q} form={form} key={q.id} />
        ))}
      </Modal>

      <Button variant='primary' onClick={toggleAddQuestionModal}>
        Dodaj novo pitanje
      </Button>
      <Table
        headers={headers}
        data={surveyQuestions}
        buttonActions={buttonActions}
      />
    </>
  );
};

export default SurveyQuestionsPage;

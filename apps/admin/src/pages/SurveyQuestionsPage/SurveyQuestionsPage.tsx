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
import { FieldValues, set, useForm } from 'react-hook-form';
import { useCreateSurveyQuestion } from '../../api/SurveyQuestions/useCreateSurveyQuestion';
import {
  CreateSurveyQuestionDto,
  UpdateSurveyQuestionDto,
} from '../../types/surveyQuestionDto';
import { useUpdateSurveyQuestion } from '../../api/SurveyQuestions/useUpdateSurveyQuestion';

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
    options: [
      SurveyQuestionType.Company,
      SurveyQuestionType.Lecture,
      SurveyQuestionType.Workshop,
    ],
  },
];

type SurveyQuestion = {
  id: number;
  question: string;
  description: string;
  inputLabel: string;
  surveyQuestionInputType: SurveyQuestionInputType;
  surveyQuestionType: SurveyQuestionType;
};

const SurveyQuestionsPage = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState<SurveyQuestion | null>(
    null,
  );
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const buttonActions = [
    {
      label: 'Uredi',
      action: (row: SurveyQuestion) => {
        console.log('Edit survey question with id: ', row);
        setQuestionToEdit(row);
        setIsOpenEditModal(!isOpenEditModal);
      },
    },
    {
      label: 'Obriši',
      action: (row: SurveyQuestion) =>
        console.log('Delete survey question with id: ', row),
    },
  ];

  const { data: surveyQuestions, isLoading } = useFetchSurveyQuestions();
  const { mutate: createSurveyQuestion } = useCreateSurveyQuestion();
  const { mutate: editSurveyQuestion } = useUpdateSurveyQuestion();

  const handleCreateSurveyQuestion = (answers: CreateSurveyQuestionDto) => {
    console.log('Create survey question');
    createSurveyQuestion(answers);
  };

  const handleEditSurveyQuestion = (
    id: number,
    answers: UpdateSurveyQuestionDto,
  ) => {
    console.log('Edit survey question');
    editSurveyQuestion({ id: id, surveyQuestion: answers });
  };

  const createSurveyQuestionForm = useForm<FieldValues>();
  const editSurveyQuestionForm = useForm<FieldValues>();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal
        isOpen={isOpenAddModal}
        toggleModal={() => {
          setIsOpenAddModal(!isOpenAddModal);
        }}>
        <Button
          onClick={createSurveyQuestionForm.handleSubmit((s) =>
            handleCreateSurveyQuestion(s as CreateSurveyQuestionDto),
          )}>
          Submit
        </Button>
        {questions.map((q) => (
          <InputHandler
            question={q}
            form={createSurveyQuestionForm}
            key={q.id}
          />
        ))}
      </Modal>

      <Modal
        isOpen={isOpenEditModal}
        toggleModal={() => {
          setIsOpenEditModal(!isOpenEditModal);
        }}>
        <Button
          onClick={editSurveyQuestionForm.handleSubmit((s) =>
            handleEditSurveyQuestion(
              questionToEdit?.id as number,
              s as UpdateSurveyQuestionDto,
            ),
          )}>
          Submit
        </Button>
        {questions.map((q) => (
          <InputHandler
            question={q}
            form={editSurveyQuestionForm}
            key={q.id}
            value={q.title?.toString()}
          />
        ))}
      </Modal>

      <Button
        variant='primary'
        onClick={() => {
          setIsOpenAddModal(!isOpenAddModal);
        }}>
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
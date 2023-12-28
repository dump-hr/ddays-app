import { useEffect, useState } from 'react';
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
import {
  CreateSurveyQuestionDto,
  SurveyQuestion,
  UpdateSurveyQuestionDto,
} from '../../types/surveyQuestion';
import { useUpdateSurveyQuestion } from '../../api/SurveyQuestions/useUpdateSurveyQuestion';
import { useDeleteSurveyQuestion } from '../../api/SurveyQuestions/useDeleteSurveyQuestion';

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
    rules: { required: 'Obavezno polje' },
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
    rules: { required: 'Obavezno polje' },
  },
  {
    id: 'surveyQuestionInputType',
    type: QuestionType.Select,
    title: 'Vrsta polja za unos',
    rules: { required: 'Obavezno polje' },
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
    rules: { required: 'Obavezno polje' },
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
  const [questionToEdit, setQuestionToEdit] = useState<SurveyQuestion | null>(
    null,
  );
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [questionToDeleteId, setQuestionToDeleteId] = useState<number | null>(
    null,
  );
  const buttonActions = [
    {
      label: 'Uredi',
      action: (row: SurveyQuestion) => {
        setQuestionToEdit(row);
        setIsOpenEditModal(!isOpenEditModal);
      },
    },
    {
      label: 'Obriši',
      action: (row: SurveyQuestion) => {
        setIsOpenDeleteModal(!isOpenDeleteModal);
        setQuestionToDeleteId(row.id);
      },
    },
  ];

  const { data: surveyQuestions, isLoading } = useFetchSurveyQuestions();
  const { mutate: createSurveyQuestion } = useCreateSurveyQuestion();
  const { mutate: editSurveyQuestion } = useUpdateSurveyQuestion();
  const { mutate: deleteSurveyQuestion } = useDeleteSurveyQuestion();

  const createSurveyQuestionForm = useForm<FieldValues>();
  const editSurveyQuestionForm = useForm<FieldValues>();

  const handleCreateSurveyQuestion = (data: CreateSurveyQuestionDto) => {
    createSurveyQuestion(data);
    if (!createSurveyQuestionForm.formState.isValid) {
      setIsOpenAddModal(!isOpenAddModal);
      createSurveyQuestionForm.reset();
    }
  };

  const handleEditSurveyQuestion = (data: UpdateSurveyQuestionDto) => {
    editSurveyQuestion({
      id: questionToEdit?.id as number,
      surveyQuestion: data,
    });
    if (!editSurveyQuestionForm.formState.isValid) {
      setIsOpenEditModal(!isOpenEditModal);
    }
  };

  useEffect(() => {
    if (questionToEdit) {
      editSurveyQuestionForm.reset({
        question: questionToEdit?.question,
        description: questionToEdit?.description,
        inputLabel: questionToEdit?.inputLabel,
        surveyQuestionInputType: questionToEdit?.surveyQuestionInputType,
        surveyQuestionType: questionToEdit?.surveyQuestionType,
      });
    }
  }, [questionToEdit]);

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
          onClick={editSurveyQuestionForm.handleSubmit((s) => {
            handleEditSurveyQuestion(s as UpdateSurveyQuestionDto);
          })}>
          Submit
        </Button>
        {questions.map((q) => (
          <InputHandler question={q} form={editSurveyQuestionForm} key={q.id} />
        ))}
      </Modal>

      <Modal
        isOpen={isOpenDeleteModal}
        toggleModal={() => {
          setIsOpenDeleteModal(!isOpenDeleteModal);
        }}>
        <div style={{ display: 'flex' }}>
          <p>Are you sure you want to delete this question?</p>
          <Button
            onClick={() => {
              deleteSurveyQuestion(questionToDeleteId as number);
              setIsOpenDeleteModal(!isOpenDeleteModal);
            }}>
            Delete
          </Button>
        </div>
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

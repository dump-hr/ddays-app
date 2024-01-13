import { Question, QuestionType } from '@ddays-app/types';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import {
  CreateInterestDto,
  useCreateInterest,
} from '../../api/Interests/useCreateInterest';
import { useDeleteInterest } from '../../api/Interests/useDeleteInterest';
import { useFetchInterests } from '../../api/Interests/useFetchInterests';
import { useUpdateInterest } from '../../api/Interests/useUpdateInterestDto';
import Button from '../../components/Button';
import InputHandler from '../../components/InputHandler';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import { InterestDto } from '../../types/interest';

const headers = ['id', 'name', 'theme'];

const questions: Question[] = [
  {
    id: 'name',
    type: QuestionType.Field,
    title: 'Ime',
    rules: { required: 'Obavezno polje' },
  },
  {
    id: 'theme',
    type: QuestionType.Select,
    title: 'Tema',
    options: ['dev', 'design', 'tech', 'marketing'],
    rules: { required: 'Obavezno polje' },
  },
];

const InterestsPage = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [interestToEdit, setInterestToEdit] = useState<InterestDto>();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [interestToDeleteId, setInterestToDeleteId] = useState<number | null>(
    null,
  );

  const { data: interests, isLoading } = useFetchInterests();
  const { mutate: deleteInterest } = useDeleteInterest();
  const { mutate: createInterest } = useCreateInterest();
  const { mutate: updateInterest } = useUpdateInterest();

  const createInterestForm = useForm<FieldValues>();
  const editInterestForm = useForm<FieldValues>();

  useEffect(() => {
    interestToEdit &&
      editInterestForm.reset({
        name: interestToEdit.name,
        theme: interestToEdit.theme,
      });
  }, [interestToEdit, editInterestForm]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const buttonActions = [
    {
      label: 'Uredi',
      action: (row: InterestDto) => {
        setInterestToEdit(row);
        setIsOpenEditModal((prev) => !prev);
      },
    },
    {
      label: 'Obriši',
      action: (row: InterestDto) => {
        setIsOpenDeleteModal((prev) => !prev);
        setInterestToDeleteId(row.id);
      },
    },
  ];

  const handleCreateInterest = (data: CreateInterestDto) => {
    createInterest(data);
    setIsOpenAddModal((prev) => !prev);
    createInterestForm.reset();
  };

  const handleEditInterest = (data: CreateInterestDto) => {
    if (!interestToEdit) return;

    updateInterest({
      id: interestToEdit.id,
      interest: data,
    });

    setIsOpenEditModal((prev) => !prev);
    editInterestForm.reset();
  };

  return (
    <>
      <h1>Interests</h1>
      <Modal
        isOpen={isOpenAddModal}
        toggleModal={() => setIsOpenAddModal((prev) => !prev)}>
        {questions.map((q) => (
          <InputHandler question={q} form={createInterestForm} key={q.id} />
        ))}
        <Button
          onClick={createInterestForm.handleSubmit((data) =>
            handleCreateInterest(data as CreateInterestDto),
          )}>
          Dodaj
        </Button>
      </Modal>

      <Modal
        isOpen={isOpenEditModal}
        toggleModal={() => setIsOpenEditModal((prev) => !prev)}>
        {questions.map((q) => (
          <InputHandler question={q} form={editInterestForm} key={q.id} />
        ))}
        <Button
          onClick={editInterestForm.handleSubmit((data) =>
            handleEditInterest(data as CreateInterestDto),
          )}>
          Uredi
        </Button>
      </Modal>

      <Modal
        isOpen={isOpenDeleteModal}
        toggleModal={() => setIsOpenDeleteModal((prev) => !prev)}>
        Jeste li sigurni da želite obrisati interes?
        <Button
          onClick={() => {
            deleteInterest(interestToDeleteId!);
            setIsOpenDeleteModal((prev) => !prev);
          }}>
          Obriši
        </Button>
      </Modal>

      <Button
        variant='primary'
        onClick={() => {
          setIsOpenAddModal((prev) => !prev);
        }}>
        Dodaj novi interes
      </Button>

      <Table
        headers={headers}
        data={interests!}
        buttonActions={buttonActions}
      />
    </>
  );
};

export default InterestsPage;

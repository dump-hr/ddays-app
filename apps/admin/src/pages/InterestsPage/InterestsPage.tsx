import { Interest, Question, QuestionType } from '@ddays-app/types';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import {
  CreateInterestDto,
  useCreateInterest,
} from '../../api/Interests/useCreateInterest';
import { useDeleteInterest } from '../../api/Interests/useDeleteInterest';
import { useFetchInterest } from '../../api/Interests/useFetchInterest';
import { useFetchInterests } from '../../api/Interests/useFetchInterests';
import { useUpdateInterest } from '../../api/Interests/useUpdateInterestDto';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Table from '../../components/Table';

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
  const [interestToEditId, setInterestToEdit] = useState<number | null>(0);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [interestToDeleteId, setInterestToDeleteId] = useState<number | null>(
    null,
  );

  //this is still work in progress, wil do soon, just waited for approval of other pages

  const { data: interests, isLoading } = useFetchInterests();
  const { mutate: deleteInterest } = useDeleteInterest();
  const { mutate: createInterest } = useCreateInterest();
  const { data: interestToEdit } = useFetchInterest(interestToEditId ?? 0);
  const { mutate: updateInterest } = useUpdateInterest();

  const createInterestForm = useForm<FieldValues>();
  const editInterestForm = useForm<FieldValues>();

  useEffect(() => {
    interestToEdit &&
      editInterestForm.reset(
        {
          name: interestToEdit.name,
          theme: interestToEdit.theme,
        },
        { keepValues: false },
      );
  }, [interestToEdit]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const buttonActions = [
    {
      label: 'Uredi',
      action: (row: Interest) => {
        setIsOpenEditModal((prev) => !prev);
        setInterestToEdit(row.id);
      },
    },
    {
      label: 'Obriši',
      action: (row: Interest) => {
        setIsOpenDeleteModal((prev) => !prev);
        setInterestToDeleteId(row.id);
      },
    },
  ];

  const handleCreateInterest = (data: CreateInterestDto) => {
    createInterest(data);
    if (!createInterestForm.formState.isValid) {
      setIsOpenAddModal((prev) => !prev);
      createInterestForm.reset();
    }
  };

  const handleEditInterest = (data: CreateInterestDto) => {
    updateInterest({
      id: interestToEditId!,
      interest: data,
    });
    if (!editInterestForm.formState.isValid) {
      setIsOpenEditModal((prev) => !prev);
      editInterestForm.reset();
    }
  };

  return (
    <>
      <h1>Interests</h1>
      <Modal
        isOpen={isOpenAddModal}
        toggleModal={() => setIsOpenAddModal((prev) => !prev)}>
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
        <Button
          onClick={editInterestForm.handleSubmit((data) =>
            handleEditInterest(data as CreateInterestDto),
          )}>
          Uredi
        </Button>
      </Modal>

      <Button
        variant='primary'
        onClick={() => {
          setIsOpenAddModal(!isOpenAddModal);
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

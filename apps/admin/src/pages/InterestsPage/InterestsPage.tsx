import { Interest } from '@ddays-app/types';
import { useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';
import { FieldValues, useForm } from 'react-hook-form';

import {
  CreateInterestDto,
  useCreateInterest,
} from '../../api/useCreateInterest';
import {
  deletedInterest,
  useDeleteInterest,
} from '../../api/useDeleteInterest';
import { useFetchInterests } from '../../api/useFetchInterests';
import { useUpdateInterest } from '../../api/useUpdateInterestDto';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Table from '../../components/Table';

const headers = ['id', 'name', 'theme'];

const InterestsPage = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [interestToEdit, setInterestToEdit] = useState<Interest | null>(null);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [interestToDeleteId, setInterestToDeleteId] = useState<number | null>(
    null,
  );

  //this is still work in progress, wil do soon, just waited for approval of other pages

  const { data: interests, isLoading } = useFetchInterests();
  const { mutate: deleteInterest } = useDeleteInterest();
  const { mutate: createInterest } = useCreateInterest();
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
        setInterestToEdit(row);
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

  return (
    <>
      <h1>Interests</h1>
      <Modal
        isOpen={isOpenAddModal}
        toggleModal={() => setIsOpenAddModal((prev) => !prev)}>
        <Button
          onClick={createInterestForm.handleSubmit((data) =>
            createInterest(data as CreateInterestDto),
          )}>
          Dodaj
        </Button>
      </Modal>
      <Table
        headers={headers}
        data={interests!}
        buttonActions={buttonActions}
      />
    </>
  );
};

export default InterestsPage;

import { FrequentlyAskedQuestion } from '@ddays-app/types/src/model/frequentlyAskedQuestion';
import { useState } from 'react';

import { useCreateFrequentlyAskedQuestion } from '../../api/useCreateFrequentlyAskedQuestion';
import { useDeleteFrequentlyAskedQuestion } from '../../api/useDeleteFrequentlyAskedQuestion';
import { useFetchAllFrequentlyAskedQuestions } from '../../api/useFetchFrequentlyAskedQuestions';
import { useUpdateFrequentlyAskedQuestion } from '../../api/useUpdateFrequentlyAskedQuestion';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Table } from '../../components/Table';
import { AddEditFrequentlyAskedQuestionModal } from './AddEditFrequentlyAskedQuestionModal';

const headers = ['Id', 'Pitanje', 'Odgovor', 'Akcije'];

export const FrequentlyAskedQuestionsPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [frequentlyAskedQuestionModal, setFrequentlyAskedQuestionModal] =
    useState<FrequentlyAskedQuestion | null>(null);
  const [frequentlyAskedQuestionToDelete, setFrequentlyAskedQuestionToDelete] =
    useState<FrequentlyAskedQuestion | null>(null);

  const buttonActions = [
    {
      label: 'Uredi',
      action: (row: object) => {
        setIsEditModalOpen(!isEditModalOpen);
        setFrequentlyAskedQuestionModal(row as FrequentlyAskedQuestion);
      },
    },
    {
      label: 'Obriši',
      action: (row: object) => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
        setFrequentlyAskedQuestionToDelete(row as FrequentlyAskedQuestion);
      },
    },
  ];

  const { data: frequentlyAskedQuestions, isLoading } =
    useFetchAllFrequentlyAskedQuestions();
  const { mutate: deleteFrequentlyAskedQuestion } =
    useDeleteFrequentlyAskedQuestion();
  const { mutate: createFrequentlyAskedQuestion } =
    useCreateFrequentlyAskedQuestion();
  const { mutate: updateFrequentlyAskedQuestion } =
    useUpdateFrequentlyAskedQuestion();

  const deleteFrequentlyAskedQuestionHandler = (id: number) => {
    setIsDeleteModalOpen(false);
    deleteFrequentlyAskedQuestion(id);
  };

  const editModalFrequentlyAskedQuestion = (
    key: string,
    value: string | number,
  ) => {
    setFrequentlyAskedQuestionModal({
      ...frequentlyAskedQuestionModal,
      [key]: value,
    } as FrequentlyAskedQuestion);
  };

  const createFrequentlyAskedQuestionHandler = () => {
    if (!frequentlyAskedQuestionModal) return;

    createFrequentlyAskedQuestion(frequentlyAskedQuestionModal);
    setIsAddModalOpen(!isAddModalOpen);
  };

  const editFrequentlyAskedQuestionHandler = () => {
    if (!frequentlyAskedQuestionModal) return;

    updateFrequentlyAskedQuestion(frequentlyAskedQuestionModal);
    setIsEditModalOpen(!isEditModalOpen);
  };

  const DeleteFrequentlyAskedQuestionModal = () => {
    if (!frequentlyAskedQuestionToDelete) return;

    const { id, question, answer } = frequentlyAskedQuestionToDelete;

    return (
      <Modal
        showCloseButton
        isOpen={isDeleteModalOpen}
        toggleModal={() => setIsDeleteModalOpen(!isDeleteModalOpen)}>
        <h3>Jesi li siguran da želiš izbrisati faq?</h3>
        <div>
          <p>Id: {id}</p>
          <p>Pitanje: {question}</p>
          <p>Odgovor: {answer}</p>
        </div>
        <Button
          variant='secondary'
          onClick={() => deleteFrequentlyAskedQuestionHandler(id)}>
          Obriši
        </Button>
      </Modal>
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Button
        style={{ marginTop: '10px' }}
        variant='secondary'
        onClick={() => setIsAddModalOpen(!isAddModalOpen)}>
        Dodaj novo pitanje
      </Button>
      <Table
        headers={headers}
        data={frequentlyAskedQuestions as object[]}
        buttonActions={buttonActions}
      />
      <AddEditFrequentlyAskedQuestionModal
        isOpen={isAddModalOpen}
        toggle={() => setIsAddModalOpen(!isAddModalOpen)}
        title='Dodaj FAQ'
        actionButtonText='Dodaj'
        actionButtonHandler={createFrequentlyAskedQuestionHandler}
        onInputChange={editModalFrequentlyAskedQuestion}
      />
      <AddEditFrequentlyAskedQuestionModal
        isOpen={isEditModalOpen}
        toggle={() => setIsEditModalOpen(!isEditModalOpen)}
        title='Uredi FAQ'
        actionButtonText='Spremi'
        actionButtonHandler={editFrequentlyAskedQuestionHandler}
        onInputChange={editModalFrequentlyAskedQuestion}
        frequentlyAskedQuestion={
          frequentlyAskedQuestionModal as FrequentlyAskedQuestion
        }
      />
      <DeleteFrequentlyAskedQuestionModal />
    </>
  );
};

import { FrequentlyAskedQuestion } from '@ddays-app/types/src/model/frequentlyAskedQuestion';
import { useState } from 'react';

import { useFetchAllFrequentlyAskedQuestions } from '../../api/useFetchFrequentlyAskedQuestions';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import AddEditFrequentlyAskedQuestionModal from './AddEditFrequentlyAskedQuestionModal';

const headers = ['Id', 'Pitanje', 'Odgovor', 'Akcije'];

const FrequentlyAskedQuestionPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [frequentlyAskedQuestionToEdit, setFrequentlyAskedQuestionToEdit] =
    useState<FrequentlyAskedQuestion | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [frequentlyAskedQuestionToDelete, setFrequentlyAskedQuestionToDelete] =
    useState<FrequentlyAskedQuestion | null>(null);

  const buttonActions = [
    {
      label: 'Uredi',
      action: (row: FrequentlyAskedQuestion) => {
        setFrequentlyAskedQuestionToEdit(row);
        setIsEditModalOpen(!isEditModalOpen);
      },
    },
    {
      label: 'Obriši',
      action: (row: FrequentlyAskedQuestion) => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
        setFrequentlyAskedQuestionToDelete(row);
      },
    },
  ];

  const { data: frequentlyAskedQuestions, isLoading } =
    useFetchAllFrequentlyAskedQuestions();

  const DeleteFrequentlyAskedQuestionModal = () => {
    if (!frequentlyAskedQuestionToDelete) return;

    const { id, question, answer } = frequentlyAskedQuestionToDelete;

    return (
      <Modal
        isOpen={isDeleteModalOpen}
        toggleModal={() => setIsDeleteModalOpen(!isDeleteModalOpen)}>
        <h3>Jesi li siguran da želiš izbrisati faq?</h3>
        <p>Id: {id}</p>
        <p>Pitanje: {question}</p>
        <p>Odgovor: {answer}</p>
        <Button variant='secondary'>Obriši</Button>
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
        data={frequentlyAskedQuestions}
        buttonActions={buttonActions}
      />
      <AddEditFrequentlyAskedQuestionModal
        isOpen={isAddModalOpen}
        toggle={() => setIsAddModalOpen(!isAddModalOpen)}
        title='Dodaj FAQ'
        actionButtonText='Dodaj'
        actionButtonHandler={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <AddEditFrequentlyAskedQuestionModal
        isOpen={isEditModalOpen}
        toggle={() => setIsEditModalOpen(!isEditModalOpen)}
        title='Uredi FAQ'
        actionButtonText='Spremi'
        actionButtonHandler={function (): void {
          throw new Error('Function not implemented.');
        }}
        frequentlyAskedQuestion={frequentlyAskedQuestionToEdit}
      />
      <DeleteFrequentlyAskedQuestionModal />
    </>
  );
};

export default FrequentlyAskedQuestionPage;

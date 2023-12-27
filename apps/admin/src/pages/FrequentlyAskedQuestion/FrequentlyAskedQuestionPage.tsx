import { FrequentlyAskedQuestion } from '@ddays-app/types/src/model/frequentlyAskedQuestion';
import { useState } from 'react';

import { useFetchAllFrequentlyAskedQuestions } from '../../api/useFetchFrequentlyAskedQuestions';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Table from '../../components/Table';

const headers = ['Id', 'Pitanje', 'Odgovor', 'Akcije'];

const FrequentlyAskedQuestionPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [frequentlyAskedQuestionToEdit, setFrequentlyAskedQuestionToEdit] =
    useState<FrequentlyAskedQuestion | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [
    frequentlyAskedQuestionToDeleteId,
    setFrequentlyAskedQuestionToDeleteId,
  ] = useState<number | null>(null);

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
        setFrequentlyAskedQuestionToDeleteId(row.id);
      },
    },
  ];

  const { data: frequentlyAskedQuestions, isLoading } =
    useFetchAllFrequentlyAskedQuestions();

  const DeleteFrequentlyAskedQuestionModal = () => {
    return (
      <Modal
        isOpen={isDeleteModalOpen}
        toggleModal={() => setIsDeleteModalOpen(!isDeleteModalOpen)}>
        <h2>Obriši faq</h2>
        <p>ime</p>
        <p>Jesi li siguran?</p>

        <Button variant='secondary'>Obriši</Button>
      </Modal>
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Button style={{ marginTop: '10px' }} variant='secondary'>
        Dodaj novo pitanje
      </Button>

      <Table
        headers={headers}
        data={frequentlyAskedQuestions}
        buttonActions={buttonActions}
      />

      <DeleteFrequentlyAskedQuestionModal />
    </>
  );
};

export default FrequentlyAskedQuestionPage;

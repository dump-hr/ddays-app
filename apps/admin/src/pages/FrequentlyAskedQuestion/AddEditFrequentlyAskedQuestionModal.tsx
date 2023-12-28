import { FrequentlyAskedQuestion } from '@ddays-app/types/src/model/frequentlyAskedQuestion';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';

type ModalProps = {
  isOpen: boolean;
  toggle: () => void;
  title: string;
  actionButtonText: string;
  actionButtonHandler: () => void;
  frequentlyAskedQuestion?: FrequentlyAskedQuestion;
};

const AddEditFrequentlyAskedQuestionModal: React.FC<ModalProps> = ({
  isOpen,
  toggle,
  title,
  actionButtonText,
  actionButtonHandler,
  frequentlyAskedQuestion,
}) => {
  return (
    <Modal isOpen={isOpen} toggleModal={toggle}>
      <h2>{title}</h2>
      <div>
        <label htmlFor=''>Pitanje</label>
        <Input
          placeholder='Unesi pitanje'
          defaultValue={frequentlyAskedQuestion?.question || ''}></Input>
      </div>
      <div>
        <label htmlFor=''>Odgovor</label>
        <Input
          placeholder='Unesi dogovor'
          defaultValue={frequentlyAskedQuestion?.answer || ''}></Input>
      </div>
      <Button variant='secondary' onClick={actionButtonHandler}>
        {actionButtonText}
      </Button>
    </Modal>
  );
};

export default AddEditFrequentlyAskedQuestionModal;

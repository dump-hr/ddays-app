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
  onInputChange: (key: string, value: string | number) => void;
  frequentlyAskedQuestion?: FrequentlyAskedQuestion;
};

const AddEditFrequentlyAskedQuestionModal: React.FC<ModalProps> = ({
  isOpen,
  toggle,
  title,
  actionButtonText,
  actionButtonHandler,
  onInputChange,
  frequentlyAskedQuestion,
}) => {
  return (
    <Modal isOpen={isOpen} toggleModal={toggle}>
      <h2>{title}</h2>
      <div>
        <label htmlFor='question'>Pitanje</label>
        <Input
          id='question'
          placeholder='Unesi pitanje'
          defaultValue={frequentlyAskedQuestion?.question || ''}
          onChange={(e) => onInputChange('question', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='answer'>Odgovor</label>
        <Input
          id='answer'
          placeholder='Unesi dogovor'
          defaultValue={frequentlyAskedQuestion?.answer || ''}
          onChange={(e) => onInputChange('answer', e.target.value)}
        />
      </div>
      <Button variant='secondary' onClick={actionButtonHandler}>
        {actionButtonText}
      </Button>
    </Modal>
  );
};

export default AddEditFrequentlyAskedQuestionModal;

import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Checkbox from '../../components/Checkbox';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Input placeholder='placeholder' />
      <Button onClick={toggleModal}>Open modal</Button>
      <Modal isOpen={isOpen} toggleModal={toggleModal}>
        <Input placeholder='Username' />
        <Input placeholder='Password' />
      </Modal>
      <Checkbox label='Some label' />
      <Checkbox label='Some other label' />
    </div>
  );
};

export default HomePage;

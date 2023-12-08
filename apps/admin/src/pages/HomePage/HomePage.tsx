import { useState } from 'react';

import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import FileUpload from '../../components/FileUpload';
import Input from '../../components/Input';
import Modal from '../../components/Modal';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState<string | ArrayBuffer | null>(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Input placeholder="placeholder" />
      <Button onClick={toggleModal}>Open modal</Button>
      <Modal isOpen={isOpen} toggleModal={toggleModal}>
        <Input placeholder="Username" />
        <Input placeholder="Password" />
      </Modal>
      <Checkbox label="Some label" />
      <Checkbox label="Some other label" />
      <FileUpload
        src={src}
        label={'some label'}
        accept={'.png,.jpg'}
        setSrc={setSrc}
      />
    </div>
  );
};

export default HomePage;

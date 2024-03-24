import { useState } from 'react';

import { useSpeakerGetAll } from '../api/speaker/useSpeakerGetAll';
import { useSpeakerRemove } from '../api/speaker/useSpeakerRemove';
import { Button } from '../components/Button';
import { FileUpload } from '../components/FileUpload';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { SpeakerForm } from '../forms/SpeakerForm';

const SpeakerPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [speakerToEditId, setSpeakerToEditId] = useState<number>();

  const speakers = useSpeakerGetAll();

  const removeSpeaker = useSpeakerRemove();

  if (speakers.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSpeakerToEditId(undefined);
        }}>
        <SpeakerForm
          id={speakerToEditId}
          onSuccess={() => {
            setIsModalOpen(false);
            setSpeakerToEditId(undefined);
          }}
        />
      </Modal>

      <Button variant='primary' onClick={() => setIsModalOpen(true)}>
        New
      </Button>

      <Table
        data={speakers.data}
        actions={[
          {
            label: 'Uredi',
            action: (speaker) => {
              setSpeakerToEditId(speaker.id);
              setIsModalOpen(true);
            },
          },
          {
            label: 'Obriši',
            action: (speaker) => {
              if (confirm('Jesi li siguran?')) {
                removeSpeaker.mutateAsync(speaker.id);
              }
            },
          },
        ]}
      />

      {/* <FileUpload
        src='1234'
        setSrc={(result) => {
          console.log(result);
        }}
      /> */}
    </>
  );
};

export default SpeakerPage;

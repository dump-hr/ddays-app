import { useState } from 'react';

import { useSpeakerGetAll } from '../api/speaker/useSpeakerGetAll';
import { useSpeakerRemove } from '../api/speaker/useSpeakerRemove';
import { useSpeakerRemovePhoto } from '../api/speaker/useSpeakerRemovePhoto';
import { useSpeakerUpdatePhoto } from '../api/speaker/useSpeakerUpdatePhoto';
import { Button } from '../components/Button';
import { FileUpload } from '../components/FileUpload';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { SpeakerForm } from '../forms/SpeakerForm';

const SpeakerPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [speakerToEditId, setSpeakerToEditId] = useState<number>();

  const [src, setSrc] = useState<string | ArrayBuffer | null>(null);

  const speakers = useSpeakerGetAll();

  const removeSpeaker = useSpeakerRemove();
  const updatePhoto = useSpeakerUpdatePhoto();
  const removePhoto = useSpeakerRemovePhoto();

  const handleUpload = async (files: File[]) => {
    await updatePhoto.mutateAsync({ id: speakerToEditId, file: files[0] });
  };

  const handleRemove = async () => {
    await removePhoto.mutateAsync(speakerToEditId);
  };

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
        <FileUpload
          src={
            speakers.data?.find((speaker) => speaker.id === speakerToEditId)
              ?.photo
          }
          setSrc={setSrc}
          accept={'.png,.jpg'}
          handleUpload={handleUpload}
          handleRemove={handleRemove}
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
    </>
  );
};

export default SpeakerPage;

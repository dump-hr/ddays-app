import { useState } from 'react';

import { useSpeakerGetAll } from '../api/speaker/useSpeakerGetAll';
import { useSpeakerRemove } from '../api/speaker/useSpeakerRemove';
import { useSpeakerRemovePhoto } from '../api/speaker/useSpeakerRemovePhoto';
import { useSpeakerRemoveSmallPhoto } from '../api/speaker/useSpeakerRemoveSmallPhoto';
import { useSpeakerUpdatePhoto } from '../api/speaker/useSpeakerUpdatePhoto';
import { useSpeakerUpdateSmallPhoto } from '../api/speaker/useSpeakerUpdateSmallPhoto';
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
  const updatePhoto = useSpeakerUpdatePhoto();
  const updateSmallPhoto = useSpeakerUpdateSmallPhoto();
  const removePhoto = useSpeakerRemovePhoto();
  const removeSmallPhoto = useSpeakerRemoveSmallPhoto();

  const handlePhotoUpload = async (files: File[]) => {
    await updatePhoto.mutateAsync({ id: speakerToEditId, file: files[0] });
  };

  const handlePhotoRemove = async () => {
    await removePhoto.mutateAsync(speakerToEditId);
  };

  const handleSmallPhotoUpload = async (files: File[]) => {
    await updateSmallPhoto.mutateAsync({ id: speakerToEditId, file: files[0] });
  };

  const handleSmallPhotoRemove = async () => {
    await removeSmallPhoto.mutateAsync(speakerToEditId);
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
        {speakerToEditId && (
          <>
            <p>Velika slika:</p>
            <FileUpload
              src={
                speakers.data?.find((speaker) => speaker.id === speakerToEditId)
                  ?.photoUrl
              }
              handleUpload={handlePhotoUpload}
              handleRemove={handlePhotoRemove}
            />
            <p>Mala slika:</p>
            <FileUpload
              src={
                speakers.data?.find((speaker) => speaker.id === speakerToEditId)
                  ?.smallPhotoUrl
              }
              handleUpload={handleSmallPhotoUpload}
              handleRemove={handleSmallPhotoRemove}
            />
          </>
        )}
      </Modal>

      <div className='flex'>
        <Button variant='primary' onClick={() => setIsModalOpen(true)}>
          New
        </Button>
      </div>

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

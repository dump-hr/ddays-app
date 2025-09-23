import { TableDashboard } from '../../components/TableDashboard';
import { useSpeakerGetAll } from '../../api/speaker/useSpeakerGetAll';
import { SpeakerForm } from '../../forms/SpeakerForm';
import { useSpeakerRemove } from '../../api/speaker/useSpeakerRemove';
import toast from 'react-hot-toast';

export const SpeakersPage = () => {
  const { data: speakers, refetch } = useSpeakerGetAll();
  const removeSpeaker = useSpeakerRemove();

  const handleDelete = async (ids: number[]) => {
    if (ids.length > 10) {
      toast.error('Možete obrisati maksimalno 10 zapisa odjednom.');
      return;
    }

    if (confirm('Jesi li siguran da želiš obrisati odabrane zapise?')) {
      for (const id of ids) {
        await removeSpeaker.mutateAsync(id);
      }
      refetch();
    }
  };

  if (!speakers) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={speakers}
      dataType='SpeakerDto'
      onRefresh={refetch}
      renderForm={(onSuccess, id) => (
        <SpeakerForm onSuccess={onSuccess} id={id} />
      )}
      onDelete={handleDelete}
      onEdit={() => {}}
    />
  );
};

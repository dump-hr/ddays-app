import { TableDashboard } from '../../components/TableDashboard';
import { useSpeakerGetAll } from '../../api/speaker/useSpeakerGetAll';
import { SpeakerForm } from '../../forms/SpeakerForm';

export const SpeakersPage = () => {
  const { data: speakers, refetch } = useSpeakerGetAll();

  if (!speakers) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={speakers}
      dataType='SpeakerDto'
      onRefresh={refetch}
      renderForm={(onSuccess) => <SpeakerForm onSuccess={onSuccess} />}
    />
  );
};

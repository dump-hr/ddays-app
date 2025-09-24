import { TableDashboard } from '../../components/TableDashboard';
import { useInterestGetAll } from '../../api/interest/useInterestGetAll';
import { InterestForm } from '../../forms/InterestForm';
import { useInterestRemove } from '../../api/interest/useInterestRemove';
import { toast } from 'react-hot-toast';

export const InterestsPage = () => {
  const { data: interests, refetch } = useInterestGetAll();
  const removeInterest = useInterestRemove();

  const handleDelete = async (ids: number[]) => {
    if (ids.length > 10) {
      toast.error('Možete obrisati maksimalno 10 zapisa odjednom.');
      return;
    }

    if (confirm('Jesi li siguran da želiš obrisati odabrane zapise?')) {
      for (const id of ids) {
        await removeInterest.mutateAsync(id);
      }
      refetch();
    }
  };

  if (!interests) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={interests}
      dataType='InterestDto'
      onRefresh={refetch}
      renderForm={(onSuccess, id) => (
        <InterestForm onSuccess={onSuccess} id={id} />
      )}
      onDelete={handleDelete}
      onEdit={() => {}}
    />
  );
};

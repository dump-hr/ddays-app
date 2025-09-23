import { TableDashboard } from '../../components/TableDashboard';
import { useGetBooths } from '../../api/booth/useGetBooths';
import { BoothForm } from '../../forms/BoothForm';
import { useRemoveBooth } from '../../api/booth/useRemoveBooth';
import toast from 'react-hot-toast';

export const BoothPage = () => {
  const { data: booths, refetch } = useGetBooths();
  const removeBooth = useRemoveBooth();

  const handleDelete = async (ids: number[]) => {
    if (ids.length > 10) {
      toast.error('Možete obrisati maksimalno 10 zapisa odjednom.');
      return;
    }

    if (confirm('Jesi li siguran da želiš obrisati odabrane zapise?')) {
      for (const id of ids) {
        await removeBooth.mutateAsync(id);
      }
      refetch();
    }
  };

  if (!booths) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={booths}
      dataType='BoothDto'
      onRefresh={refetch}
      renderForm={(onSuccess, id) => {
        const booth = booths.find((b) => b.id === id);
        return <BoothForm onSuccess={onSuccess} booth={booth} />;
      }}
      onDelete={handleDelete}
      onEdit={() => {}}
    />
  );
};

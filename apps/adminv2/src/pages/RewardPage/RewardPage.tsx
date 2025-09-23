import { TableDashboard } from '../../components/TableDashboard';
import { useRewardGetAll } from '../../api/reward/useRewardGetAll';
import { RewardForm } from '../../forms/RewardForm';
import { toast } from 'react-hot-toast';
import { useRewardRemove } from '../../api/reward/useRewardRemove';

export const RewardPage = () => {
  const { data: rewards, refetch } = useRewardGetAll();
  const removeReward = useRewardRemove();

  const handleDelete = async (ids: number[]) => {
    if (ids.length > 10) {
      toast.error('Možete obrisati maksimalno 10 zapisa odjednom.');
      return;
    }

    if (confirm('Jesi li siguran da želiš obrisati odabrane zapise?')) {
      for (const id of ids) {
        await removeReward.mutateAsync(id);
      }
      refetch();
    }
  };

  if (!rewards) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={rewards}
      dataType='RewardDto'
      onRefresh={refetch}
      renderForm={(onSuccess, id) => (
        <RewardForm onSuccess={onSuccess} id={id} />
      )}
      onDelete={handleDelete}
      onEdit={() => {}}
    />
  );
};

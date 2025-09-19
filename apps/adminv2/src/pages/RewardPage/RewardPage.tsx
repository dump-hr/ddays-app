import { TableDashboard } from '../../components/TableDashboard';
import { useRewardGetAll } from '../../api/reward/useRewardGetAll';
import { RewardForm } from '../../forms/RewardForm';

export const RewardPage = () => {
  const { data: rewards, refetch } = useRewardGetAll();

  if (!rewards) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={rewards}
      dataType='RewardDto'
      onRefresh={refetch}
      renderForm={(onSuccess) => <RewardForm onSuccess={onSuccess} />}
    />
  );
};

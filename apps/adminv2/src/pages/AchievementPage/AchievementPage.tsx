import { TableDashboard } from '../../components/TableDashboard';
import { useAchievementGetAll } from '../../api/achievement/useAchievementGetAll';
import { AchievementForm } from '../../forms/AchievementForm';

export const AchievementPage = () => {
  const { data: achievements, refetch } = useAchievementGetAll();

  if (!achievements) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={achievements}
      dataType='AchievementDto'
      onRefresh={refetch}
      renderForm={(onSuccess) => <AchievementForm onSuccess={onSuccess} />}
    />
  );
};

import { TableDashboard } from '../../components/TableDashboard';
import { useAchievementGetAll } from '../../api/achievement/useAchievementGetAll';
import { AchievementForm } from '../../forms/AchievementForm';
import { toast } from 'react-hot-toast';
import { useAchievementRemove } from '../../api/achievement/useAchievementRemove';

export const AchievementPage = () => {
  const { data: achievements, refetch } = useAchievementGetAll();
  const removeAchievement = useAchievementRemove();

  const handleDelete = async (ids: number[]) => {
    if (ids.length > 10) {
      toast.error('Možete obrisati maksimalno 10 zapisa odjednom.');
      return;
    }

    if (confirm('Jesi li siguran da želiš obrisati odabrane zapise?')) {
      for (const id of ids) {
        await removeAchievement.mutateAsync(id);
      }
      refetch();
    }
  };
  if (!achievements) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={achievements}
      dataType='AchievementDto'
      onRefresh={refetch}
      renderForm={(onSuccess, id) => {
        const achievement = achievements.find((b) => b.id === id);
        return (
          <AchievementForm onSuccess={onSuccess} achievement={achievement} />
        );
      }}
      onDelete={handleDelete}
      onEdit={() => {}}
    />
  );
};

import { useAchievementGetAll } from '../../api/achievement/useAchievementGetAll';
import Table from '../../components/Table';

export const AchievementsPage = () => {
  const { data, isError, isLoading } = useAchievementGetAll();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Pogreška pri fetchanju podataka. Pogledaj konzolu.</div>;
  }

  return (
    <Table
      data={data}
      actions={[
        {
          label: 'test',
          action: (row) => console.log(row),
        },
        {
          label: 'test',
          action: (row) => console.log(row),
        },
      ]}
    />
  );
};

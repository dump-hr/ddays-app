import { TableDashboard } from '../../components/TableDashboard';
import { useGetBooths } from '../../api/booth/useGetBooths';
import { BoothForm } from '../../forms/BoothForm';

export const BoothPage = () => {
  const { data: booths, refetch } = useGetBooths();

  if (!booths) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={booths}
      dataType='BoothDto'
      onRefresh={refetch}
      renderForm={(onSuccess) => <BoothForm onSuccess={onSuccess} />}
    />
  );
};

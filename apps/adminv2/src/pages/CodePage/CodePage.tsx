import { TableDashboard } from '../../components/TableDashboard';
import { CodeForm } from '../../forms/CodeForm';
import { useCodeGetAll } from '../../api/code/useCodeGetAll';

export const CodePage = () => {
  const { data: codes, refetch } = useCodeGetAll();

  if (!codes) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={codes}
      dataType='CodeDto'
      onRefresh={refetch}
      renderForm={(onSuccess) => <CodeForm onSuccess={onSuccess} />}
    />
  );
};

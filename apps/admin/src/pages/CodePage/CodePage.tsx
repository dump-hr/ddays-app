import { TableDashboard } from '../../components/TableDashboard';
import { CodeForm } from '../../forms/CodeForm';
import { useCodeGetAll } from '../../api/code/useCodeGetAll';
import toast from 'react-hot-toast';
import { useCodeRemove } from '../../api/code/useCodeRemove';

export const CodePage = () => {
  const { data: codes, refetch } = useCodeGetAll();
  const removeCode = useCodeRemove();

  const handleDelete = async (ids: number[]) => {
    if (ids.length > 10) {
      toast.error('Možete obrisati maksimalno 10 zapisa odjednom.');
      return;
    }

    if (confirm('Jesi li siguran da želiš obrisati odabrane zapise?')) {
      for (const id of ids) {
        await removeCode.mutateAsync(id);
      }
      refetch();
    }
  };

  if (!codes) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={codes}
      dataType='CodeDto'
      onRefresh={refetch}
      renderForm={(onSuccess, id) => {
        const code = codes.find((b) => b.id === id);
        return <CodeForm onSuccess={onSuccess} code={code} />;
      }}
      onDelete={handleDelete}
      onEdit={() => {}}
    />
  );
};

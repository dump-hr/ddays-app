import { TableDashboard } from '../../components/TableDashboard';
import { useCompanyGetAllPublic } from '../../api/company/useCompanyGetAllPublic';
import { CompanyForm } from '../../forms/CompanyForm';
import { useCompanyRemove } from '../../api/company/useCompanyRemove';
import toast from 'react-hot-toast';

export const CompanyPage = () => {
  const { data: companies, refetch } = useCompanyGetAllPublic();
  const removeCompany = useCompanyRemove();

  const handleDelete = async (ids: number[]) => {
    if (ids.length > 10) {
      toast.error('Možete obrisati maksimalno 10 zapisa odjednom.');
      return;
    }

    if (confirm('Jesi li siguran da želiš obrisati odabrane zapise?')) {
      for (const id of ids) {
        await removeCompany.mutateAsync(id);
      }
      refetch();
    }
  };

  if (!companies) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={companies}
      dataType='CompanyDto'
      onRefresh={refetch}
      renderForm={(onSuccess, id) => (
        <CompanyForm onSuccess={onSuccess} id={id} />
      )}
      onDelete={handleDelete}
      onEdit={() => {}}
    />
  );
};

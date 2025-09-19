import { TableDashboard } from '../../components/TableDashboard';
import { useCompanyGetAllPublic } from '../../api/company/useCompanyGetAllPublic';
import { CompanyForm } from '../../forms/CompanyForm';

export const CompanyPage = () => {
  const { data: companies, refetch } = useCompanyGetAllPublic();

  if (!companies) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={companies}
      dataType='CompanyDto'
      onRefresh={refetch}
      renderForm={(onSuccess) => <CompanyForm onSuccess={onSuccess} />}
    />
  );
};

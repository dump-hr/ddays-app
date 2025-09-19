import { TableDashboard } from '../../components/TableDashboard';
import { useInterestGetAll } from '../../api/interest/useInterestGetAll';
import { InterestForm } from '../../forms/InterestForm';
export const InterestsPage = () => {
  const { data: interests, refetch } = useInterestGetAll();

  if (!interests) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={interests}
      dataType='InterestDto'
      onRefresh={refetch}
      renderForm={(onSuccess) => <InterestForm onSuccess={onSuccess} />}
    />
  );
};

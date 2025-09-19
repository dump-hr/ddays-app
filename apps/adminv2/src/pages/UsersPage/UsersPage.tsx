import { TableDashboard } from '../../components/TableDashboard';
import { useGetAllUsers } from '../../api/user/useGetAllUsers';
import { UserForm } from '../../forms/UserForm';

export const UsersPage = () => {
  const { data: users, refetch } = useGetAllUsers();

  if (!users) return <div>Loading...</div>;

  return (
    <TableDashboard
      data={users}
      dataType='UserPublicDto'
      onRefresh={refetch}
      renderForm={(onSuccess) => <UserForm onSuccess={onSuccess} />}
    />
  );
};

import { TableDashboard } from '../../components/TableDashboard';
import { useGetAllUsers } from '../../api/user/useGetAllUsers';

export const UsersPage = () => {
  const { data: users } = useGetAllUsers();

  if (!users) {
    return <div>Loading...</div>;
  }

  return <TableDashboard data={users} />;
};

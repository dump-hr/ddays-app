import { TableDashboard } from '../../components/TableDashboard';
import { useGetAllUsers } from '../../api/user/useGetAllUsers';

export const UsersPage = () => {
  const { data: users, refetch } = useGetAllUsers();

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <TableDashboard data={users} dataType='UserPublicDto' onRefresh={refetch} />
  );
};

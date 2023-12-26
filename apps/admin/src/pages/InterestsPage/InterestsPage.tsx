import { Interest } from '@ddays-app/types';
import { act } from 'react-dom/test-utils';

import { deletedInterest } from '../../api/useDeleteInterest';
import { useFetchInterests } from '../../api/useFetchInterests';
import Table from '../../components/Table';

const headers = ['id', 'name', 'theme'];

const deleteAction = [
  {
    label: 'Obriši',
    action: (row: Interest) => {
      deletedInterest(row.id).then(() => {
        act(() => {
          window.location.reload();
        });
      });
    },
  },
];

const InterestsPage = () => {
  const { data: interests, isLoading } = useFetchInterests();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Table headers={headers} data={interests!} buttonActions={deleteAction} />
  );
};

export default InterestsPage;

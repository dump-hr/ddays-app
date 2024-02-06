import { useInterestGetAllPublic } from '../api/interest/useInterestGetAllPublic';
import { useInterestRemove } from '../api/interest/useInterestRemove';
import { Table } from '../components/Table';

export const InterestPage = () => {
  const interests = useInterestGetAllPublic();

  const removeInterest = useInterestRemove();

  if (interests.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Table
        data={interests.data}
        actions={[
          {
            label: 'Uredi',
            action: (interest) => {},
          },
          {
            label: 'Obriši',
            action: (interest) => {
              if (confirm('Are you sure?')) {
                removeInterest.mutateAsync(interest.id);
              }
            },
          },
        ]}
      />
    </>
  );
};

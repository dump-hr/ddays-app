import { useInterestGetAllPublic } from '../api/interest/useInterestGetAllPublic';
import { Table } from '../components/Table';

export const InterestPage = () => {
  const interests = useInterestGetAllPublic();

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
            action: (interest) => {},
          },
        ]}
      />
    </>
  );
};

import { usePotentialSponsorGetAll } from '../../api/potential-sponsor/usePotentialSponsorGetAll';
import { PotentialSponsorsTable } from '../../components/PotentialSponsorsTable';
import { PotentialSponsorForm } from '../../forms/PotentialSponsorForm';

export const PotentialSponsorsPage = () => {
  const { data: potentialSponsors, refetch } = usePotentialSponsorGetAll();

  if (!potentialSponsors) return <div>Loading...</div>;

  return (
    <div>
      {potentialSponsors && potentialSponsors.length > 0 ? (
        <PotentialSponsorsTable
          sponsors={potentialSponsors}
          onRefresh={refetch}
          renderForm={(onSuccess, id) => (
            <PotentialSponsorForm onSuccess={onSuccess} id={id} />
          )}
        />
      ) : (
        <p>No potential sponsors found.</p>
      )}
    </div>
  );
};

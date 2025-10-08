import { usePotentialSponsorGetAll } from '../../api/potential-sponsor/usePotentialSponsorGetAll';
import { PotentialSponsorsTable } from '../../components/PotentialSponsorsTable';
import { PotentialSponsorDto } from '@ddays-app/types';

export const PotentialSponsorsPage = () => {
  const { data: potentialSponsors } = usePotentialSponsorGetAll();

  const handleUpdate = (updatedSponsor: PotentialSponsorDto) => {
    console.log('Update sponsor:', updatedSponsor);
    // TODO: call API to update
  };

  return (
    <div>
      {potentialSponsors && potentialSponsors.length > 0 ? (
        <PotentialSponsorsTable
          sponsors={potentialSponsors}
          onUpdate={handleUpdate}
        />
      ) : (
        <p>No potential sponsors found.</p>
      )}
    </div>
  );
};

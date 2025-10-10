import { useMemo, useState } from 'react';
import { useSponsorMaterialsGetAll } from '../../api/sponsor-materials/useSponsorMaterialsGetAll';
import { TableSearch } from '../../components/TableDashboard/TableSearch';
import { SponsorMaterialsTable } from '../../components/SponsorMaterialsTable';
import { PotentialSponsorsFilters } from '../../components/PotentialSponsorsTable/PotentialSponsorFilters';
import { Tier } from '@ddays-app/types';

export const SponsorMaterialsPage = () => {
  const { data: sponsorMaterials } = useSponsorMaterialsGetAll();

  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<Tier | ''>('');
  const [representativeFilter, setRepresentativeFilter] = useState('');

  const filteredSponsors = useMemo(() => {
    if (!sponsorMaterials) return [];
    return sponsorMaterials.filter((s) => {
      const matchesCompany = s.potentialSponsor?.company
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRep =
        representativeFilter === '' ||
        s.potentialSponsor?.representative.toLowerCase() ===
          representativeFilter.toLowerCase();
      const matchesTier =
        tierFilter === '' || s.potentialSponsor?.tier === tierFilter;
      return matchesCompany && matchesRep && matchesTier;
    });
  }, [sponsorMaterials, searchTerm, representativeFilter, tierFilter]);

  const uniqueRepresentatives = sponsorMaterials
    ? Array.from(
        new Set(
          sponsorMaterials
            .map((s) => s.potentialSponsor?.representative)
            .filter((rep): rep is string => typeof rep === 'string'),
        ),
      ).sort()
    : [];

  return (
    <>
      {!sponsorMaterials ? (
        <div>Loading...</div>
      ) : (
        <>
          <TableSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            dataType='SponsorMaterialsDto'
          />

          <PotentialSponsorsFilters
            tierFilter={tierFilter}
            onTierChange={setTierFilter}
            representativeFilter={representativeFilter}
            onRepresentativeChange={setRepresentativeFilter}
            uniqueRepresentatives={uniqueRepresentatives}
          />
          {filteredSponsors.length > 0 ? (
            <SponsorMaterialsTable materials={filteredSponsors} />
          ) : (
            <p>No materials found.</p>
          )}
        </>
      )}
    </>
  );
};

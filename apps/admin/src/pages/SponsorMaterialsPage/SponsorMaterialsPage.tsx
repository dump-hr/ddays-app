import { useMemo, useState } from 'react';
import { useSponsorMaterialsGetAll } from '../../api/sponsor-materials/useSponsorMaterialsGetAll';
import { TableSearch } from '../../components/TableDashboard/TableSearch';
import { SponsorMaterialsTable } from '../../components/SponsorMaterialsTable';
import { PotentialSponsorsFilters } from '../../components/PotentialSponsorsTable/PotentialSponsorFilters';
import { Tier } from '@ddays-app/types';

export const SponsorMaterialsPage = () => {
  const { data: sponsorMaterials, isLoading } = useSponsorMaterialsGetAll();

  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<Tier | undefined>(undefined);
  const [representativeFilter, setRepresentativeFilter] = useState<
    string | undefined
  >(undefined);

  const filteredSponsors = useMemo(() => {
    if (!sponsorMaterials) return [];
    return sponsorMaterials.filter((s) => {
      const company = s.potentialSponsor?.company?.toLowerCase() ?? '';
      const rep = s.potentialSponsor?.representative?.toLowerCase() ?? '';
      const tier = s.potentialSponsor?.tier;

      const matchesCompany = company.includes(searchTerm.toLowerCase());
      const matchesRep =
        representativeFilter === undefined ||
        rep === representativeFilter.toLowerCase();
      const matchesTier = tierFilter === undefined || tier === tierFilter;

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
      {isLoading ? (
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

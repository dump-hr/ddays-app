import { useMemo, useState } from 'react';
import { TableSearch } from '../../components/TableDashboard/TableSearch';
import { PotentialSponsorsFilters } from '../../components/PotentialSponsorsTable/PotentialSponsorFilters';
import { useSponsorContractsGetAll } from '../../api/sponsor-contracts/useSponsorContractsGetAll';

import c from '../PotentialSponsorsPage/PotentialSponsorsPage.module.scss';
import { SponsorContractForm } from '../../forms/SponsorContractForm';
import { SponsorContractsTable } from '../../components/SponsorContractsTable';

export const SponsorContractsPage = () => {
  const {
    data: sponsorContracts,
    isLoading,
    refetch,
  } = useSponsorContractsGetAll();

  const [searchTerm, setSearchTerm] = useState('');
  const [representativeFilter, setRepresentativeFilter] = useState<
    string | undefined
  >(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const filteredSponsorContracts = useMemo(() => {
    if (!sponsorContracts) return [];
    return sponsorContracts.filter((s) => {
      const company = s.potentialSponsor?.company?.toLowerCase() ?? '';
      const rep = s.potentialSponsor?.representative?.toLowerCase() ?? '';

      const matchesCompany = company.includes(searchTerm.toLowerCase());
      const matchesRep =
        representativeFilter === undefined ||
        rep === representativeFilter.toLowerCase();

      return matchesCompany && matchesRep;
    });
  }, [sponsorContracts, searchTerm, representativeFilter]);

  const uniqueRepresentatives = sponsorContracts
    ? Array.from(
        new Set(
          sponsorContracts
            .map((s) => s.potentialSponsor?.representative)
            .filter((rep): rep is string => typeof rep === 'string'),
        ),
      ).sort()
    : [];

  const handleOpenForm = (id?: number) => {
    setEditId(id ?? null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleFormSuccess = () => {
    handleCloseForm();
    refetch();
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <TableSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            dataType='SponsorContractsDto'
          />

          <PotentialSponsorsFilters
            representativeFilter={representativeFilter}
            onRepresentativeChange={setRepresentativeFilter}
            uniqueRepresentatives={uniqueRepresentatives}
          />

          {filteredSponsorContracts.length > 0 ? (
            <SponsorContractsTable
              contracts={filteredSponsorContracts}
              onEdit={handleOpenForm}
            />
          ) : (
            <p>No contracts found.</p>
          )}

          {isFormOpen && (
            <div className={c.modalBackdrop} onClick={handleCloseForm}>
              <div
                className={c.modalContent}
                onClick={(e) => e.stopPropagation()}>
                <SponsorContractForm
                  onSuccess={handleFormSuccess}
                  id={editId ?? undefined}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

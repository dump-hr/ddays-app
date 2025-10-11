import c from '../PotentialSponsorsTable/PotentialSponsorsTable.module.scss';

export const tableColumns = [
  { label: '#', key: 'number', className: c.numberCol },
  { label: 'Firma', key: 'company' },
  { label: 'Predstavnik', key: 'representative' },
  { label: 'Ime', key: 'name' },
  { label: 'Adresa', key: 'address' },
  { label: 'OIB', key: 'oib' },
  { label: 'Predstavnik firme', key: 'companyRepresentative' },
  {
    label: 'Poz. predstavnika',
    key: 'companyRepresentativePosition',
  },
  { label: 'Upit za podatke', key: 'queryForCompanyData', small: true },
  { label: 'Generirano', key: 'generated', small: true },
  { label: 'Potpisano (Lucija)', key: 'signedFromDUMP', small: true },
  { label: 'Ugovor poslan (potpisan)', key: 'contractSent', small: true },
  { label: 'Potpisano (Firma)', key: 'signedFromSponsor', small: true },
  { label: 'Račun generiran', key: 'billGenerated', small: true },
  { label: 'Račun plaćen', key: 'billPayed', small: true },
  { label: 'Arhivirano', key: 'archived', small: true },
];

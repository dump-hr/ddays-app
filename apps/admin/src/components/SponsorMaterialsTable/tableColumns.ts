import c from '../PotentialSponsorsTable/PotentialSponsorsTable.module.scss';

export const tableColumns = [
  { label: '#', key: 'number', className: c.numberCol },
  { label: 'Razina', key: 'tier' },
  { label: 'Firma', key: 'company' },
  { label: 'Predstavnik', key: 'representative' },
  { label: 'Logo', key: 'logo', small: true },
  { label: 'Slika', key: 'slika', small: true },
  { label: 'Opis', key: 'opis', small: true },
  { label: 'Video', key: 'video', small: true },
  { label: 'Oglasi', key: 'oglasi', small: true },
  { label: 'App-carrer', key: 'app', small: true },
  { label: 'S.B. dostavljen', key: 'sb', small: true },
  { label: 'Campfire', key: 'campfire', small: true },
  { label: 'Fly talk', key: 'fly', small: true },
  { label: 'Plan Štanda', key: 'plan', small: true },
  { label: 'Oprema', key: 'oprema', small: true },
  { label: 'Osobe za akr.', key: 'osobe', small: true },
  { label: 'Uneseni u app', key: 'uneseni', small: true },
  { label: 'Notes', key: 'notes' },
];

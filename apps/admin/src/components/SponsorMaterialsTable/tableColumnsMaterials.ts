import c from '../PotentialSponsorsTable/PotentialSponsorsTable.module.scss';

export const tableColumns = [
  { label: '#', key: 'number', className: c.numberCol },
  { label: 'Razina', key: 'tier' },
  { label: 'Firma', key: 'company' },
  { label: 'Predstavnik', key: 'representative' },

  { label: 'Logo', key: 'logo', small: true },
  { label: 'Slika', key: 'picture', small: true },
  { label: 'Opis', key: 'description', small: true },
  { label: 'Video', key: 'video', small: true },
  { label: 'Oglasi', key: 'advertisement', small: true },
  { label: 'App-carrer', key: 'appCareer', small: true },
  { label: 'S.B. dostavljen', key: 'swagBag', small: true },
  { label: 'Campfire', key: 'campfire', small: true },
  { label: 'Fly talk', key: 'flyTalks', small: true },
  { label: 'Plan Štanda', key: 'boothPlan', small: true },
  { label: 'Oprema', key: 'equipment', small: true },
  { label: 'Osobe za akr.', key: 'peopleForAccreditation', small: true },
  { label: 'Uneseni u app', key: 'insertedIntoApp', small: true },
  { label: 'Datum pristanka', key: 'createdOn' },
];

export const YEAR = 2026;

export const ISO = {
  // sponsor
  SPONSOR_FLY_TALK_DEADLINE: '2026-05-27T12:00:00Z',
  SPONSOR_FLY_TALK_DEADLINE_STRING:
    'Odabir sudionika zatvorit će se u srijedu 27. 5. u 12:00.',
  CODE_DEFAULT_EXPIRATION: '2026-05-29T20:00:00.000',
  // main conference days (full ISO timestamps)
  FIRST_DAY_START: '2026-05-28T08:00:00Z',
  SECOND_DAY_START: '2026-05-29T08:00:00Z',
  MAY_30_END: '2026-05-30T23:00:00Z',
  // spots / booth selection opening (UTCDate(2026,4,5,10,0) -> 2026-05-05T10:00:00Z)
  SPOTS_OPENING: '2025-12-05T10:00:00Z',
  // early bird cutoffs used in frontend/backend
  EARLY_BIRD_CUTOFF_FRONTEND: '2026-05-15T23:00:00.000Z',
  EARLY_BIRD_CUTOFF_API: '2026-05-15T23:00:00.000Z',
};

export const DISPLAY = {
  // Croatian user-facing strings used in sponsor forms and UI
  SPONSOR_DEADLINE_TRAVANJ_1: 'Predaja do 1. travnja 2026.',
  SPONSOR_DEADLINE_OZUJAK_8: 'Predaja do 8. ožujka 2026.',
  SPONSOR_DEADLINE_OZUJAK_15: 'Predaja do 15. ožujka 2026.',
  SPONSOR_DEADLINE_TRAVANJ_15: 'Predaja do 15. travnja 2026.',

  //Swag bag page in sponsor app
  SWAG_BAG_DEADLINE:
    'Molimo vas da informacije o swag bag materijalima predate do 15. svibnja 2026.',

  // Small display snippets used in schedule/flytalks
  LOCATION_DAY_1_SHORT: '28.',
  LOCATION_DAY_2_FULL: '29. 05. 2026.',
  FLYTALKS_DAY_1: '28.05. // ČETVRTAK',
  FLYTALKS_DAY_2: '29.05. // PETAK',

  TEMP_HEADER_DAYS: '28. — 29. 05.',
  TEMP_HEADER_YEAR: '2026.',

  // Header dates (earlier values kept for compatibility)
  HEADER_DAY_START_NUM: '28.',
  HEADER_DAY_END_FULL: '29. 05. 2026.',

  FIRST_DAY_DATE: '28.5',
  SECOND_DAY_DATE: '29.5',

  FIRST_DAY_AND_DATE: 'ČETVRTAK, 28.05',
  SECOND_DAY_AND_DATE: 'PETAK, 29.05',

  FIRST_DATE_AND_DAY: '28. 5. - PETAK',
  SECOND_DATE_AND_DAY: '29. 5. - ČETVRTAK',

  //Jos prominit u FlyTalksPage u sponsor appu "tabs" koji se izvlace iz baze podataka
};

export default { YEAR, ISO, DISPLAY };

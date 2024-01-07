import { QuestionType, SponsorCategory } from '@ddays-app/types';

const headers = [
  'Ime',
  'Opis',
  'Website',
  'Email',
  'Lokacija štanda',
  'Kod',
  'Kategorija sponzorstva',
  'Akcije',
];

const questions = [
  {
    id: 'name',
    type: QuestionType.Field,
    title: 'Ime',
    rules: { required: 'Obavezno polje' },
  },
  {
    id: 'description',
    type: QuestionType.TextArea,
    title: 'Opis',
    rules: { required: 'Obavezno polje' },
  },
  {
    id: 'website',
    type: QuestionType.Field,
    title: 'Website',
  },
  {
    id: 'email',
    type: QuestionType.Field,
    title: 'Email',
    rules: { required: 'Obavezno polje' },
  },
  {
    id: 'boothLocation',
    type: QuestionType.Field,
    title: 'Lokacija štanda',
  },
  {
    id: 'codeId',
    type: QuestionType.Field,
    title: 'Kod', //TODO: ovo ce bit select nakon sto se napravi kodovi endpoint
  },
  {
    id: 'sponsorCategory',
    type: QuestionType.Select,
    title: 'Kategorija sponzorstva',
    options: [
      SponsorCategory.Bronze,
      SponsorCategory.Gold,
      SponsorCategory.Silver,
      SponsorCategory.FoodAndBeverage, //If more are needed just add them
    ],
  },
];

export const CompaniesPage = () => {
  
};

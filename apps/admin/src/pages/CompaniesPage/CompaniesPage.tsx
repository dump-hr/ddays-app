import { QuestionType } from '@ddays-app/types';

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
    
  },
];

export const CompaniesPage = () => {};

import { CompanyCategory, CompanyModifyDto } from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { useCompanyCreate } from '../api/company/useCompanyCreate';
import { useCompanyGetOne } from '../api/company/useCompanyGetOne';
import { useCompanyUpdate } from '../api/company/useCompanyUpdate';
import { useInterestGetAll } from '../api/interest/useInterestGetAll';
import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { Question, QuestionType } from '../types/question';

type CompanyFormProps = {
  id?: number;
  onSuccess: () => void;
};

export const CompanyForm: React.FC<CompanyFormProps> = ({ id, onSuccess }) => {
  const { data: company, isLoading } = useCompanyGetOne(id);
  const { data: interests } = useInterestGetAll();

  const createCompany = useCompanyCreate();
  const updateCompany = useCompanyUpdate();

  const questions: Question[] = [
    {
      id: 'name',
      type: QuestionType.Field,
      title: 'Ime',
      defaultValue: company?.name,
    },
    {
      id: 'username',
      type: QuestionType.Field,
      title: 'Username',
      defaultValue: company?.username,
    },
    {
      id: 'description',
      type: QuestionType.TextArea,
      title: 'Opis',
      defaultValue: company?.description,
    },
    {
      id: 'website',
      type: QuestionType.Field,
      title: 'Website',
      defaultValue: company?.website,
    },
    {
      id: 'boothLocation',
      type: QuestionType.Field,
      title: 'Lokacija štanda',
      defaultValue: company?.boothLocation,
    },
    {
      id: 'category',
      type: QuestionType.Select,
      title: 'Kategorija sponzorstva',
      options: Object.values(CompanyCategory),
      defaultValue: company?.category,
    },
    {
      id: 'interestIds',
      type: QuestionType.MultipleSelect,
      title: 'Interesi',
      options:
        interests?.map((interest) => ({
          label: interest.name,
          value: interest.id,
        })) ?? [],
      defaultValue: company?.interests?.map((interest) => interest.id),
    },
  ];

  const form = useForm<CompanyModifyDto>({
    resolver: classValidatorResolver(CompanyModifyDto),
  });

  if (id && isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {questions.map((q) => (
        <InputHandler question={q} form={form} key={q.id} />
      ))}
      <Button
        onClick={form.handleSubmit(async (formData) => {
          if (id) {
            await updateCompany.mutateAsync({ ...formData, id });
          } else {
            await createCompany.mutateAsync(formData);
          }
          onSuccess();
        })}>
        Submit
      </Button>
    </div>
  );
};

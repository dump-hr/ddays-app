import {
  BoothDto,
  BoothModifyFormDto,
  CompanyCategory,
} from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { useCreateBooth } from '../api/booth/useCreateBooth';
import { useUpdateBooth } from '../api/booth/useModifyBooth';
import { useCompanyGetAllPublic } from '../api/company/useCompanyGetAllPublic';
import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { Question, QuestionType } from '../types/question';

import c from './Form.module.scss';

export interface BoothFormProps {
  booth?: BoothDto;
  onSuccess?: () => void;
}

export const BoothForm: React.FC<BoothFormProps> = ({ booth, onSuccess }) => {
  const companies = useCompanyGetAllPublic();

  const createBooth = useCreateBooth();
  const updateBooth = useUpdateBooth();

  const questions: Question[] = [
    {
      id: 'name',
      type: QuestionType.Field,
      title: 'Ime',
      defaultValue: booth?.name,
    },
    {
      id: 'category',
      type: QuestionType.Select,
      title: 'Kategorija sponzorstva',
      options: Object.values(CompanyCategory),
      defaultValue: booth?.category,
    },
    {
      id: 'companyName',
      type: QuestionType.Select,
      title: 'Kompanija',
      isAllowedEmpty: true,
      options: (companies.data || []).map((company) => company.name),
      defaultValue: companies.data?.find(
        (company) => company.id === booth?.companyId,
      )?.name,
    },
  ];

  const form = useForm<BoothModifyFormDto>({
    resolver: classValidatorResolver(BoothModifyFormDto),
  });

  if (companies.isLoading) {
    return null;
  }

  return (
    <div className={c.formContainer}>
      {questions.map((q) => (
        <InputHandler question={q} form={form} key={q.id} />
      ))}
      <Button
        onClick={form.handleSubmit(async (formData) => {
          const data = {
            name: formData.name,
            category: formData.category,
            companyId:
              formData.companyName !== '-'
                ? companies.data?.find(
                    (company) => company.name === formData.companyName,
                  )?.id
                : -1,
          };
          if (booth) {
            await updateBooth.mutateAsync({ ...data, id: booth.id });
          } else {
            await createBooth.mutateAsync(data);
          }
          onSuccess && onSuccess();
        })}>
        Submit
      </Button>
    </div>
  );
};

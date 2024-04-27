import {
  AdminBoothDto,
  CompanyCategory,
  ModifyBoothForm,
} from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { useCreateBooth } from '../api/booth/useCreateBooth';
import { useModifyBooth } from '../api/booth/useModifyBooth';
import { useCompanyGetAllPublic } from '../api/company/useCompanyGetAllPublic';
import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { Question, QuestionType } from '../types/question';

export interface BoothFormProps {
  booth?: AdminBoothDto;
  onSuccess?: () => void;
}

export const BoothForm: React.FC<BoothFormProps> = ({ booth, onSuccess }) => {
  const { data: companies } = useCompanyGetAllPublic();

  const createBooth = useCreateBooth();
  const updateBooth = useModifyBooth();

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
      id: 'companyId',
      type: QuestionType.Select,
      title: 'Kompanija',
      options: companies?.map((company) => company.name) ?? [],
      defaultValue: companies?.find(
        (company) => company.id === booth?.companyId,
      )?.name,
    },
  ];

  const form = useForm<ModifyBoothForm>({
    resolver: classValidatorResolver(ModifyBoothForm),
  });

  return (
    <div>
      {questions.map((q) => (
        <InputHandler question={q} form={form} key={q.id} />
      ))}
      <Button
        onClick={form.handleSubmit(async (formData) => {
          if (booth) {
            await updateBooth.mutateAsync({
              name: formData.name,
              category: formData.category,
              companyId:
                Number(formData.companyId) > 0
                  ? Number(formData.companyId)
                  : undefined,
              id: booth.id,
            });
          } else {
            await createBooth.mutateAsync({
              name: formData.name,
              category: formData.category!,
            });
          }
          onSuccess && onSuccess();
        })}>
        Submit
      </Button>
    </div>
  );
};

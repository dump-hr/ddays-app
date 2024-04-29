import { BoothDto, BoothUpdateDto, CompanyCategory } from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { useCreateBooth } from '../api/booth/useCreateBooth';
import { useUpdateBooth } from '../api/booth/useModifyBooth';
import { useCompanyGetAllPublic } from '../api/company/useCompanyGetAllPublic';
import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { Question, QuestionType } from '../types/question';

export interface BoothFormProps {
  booth?: BoothDto;
  onSuccess?: () => void;
}

export const BoothForm: React.FC<BoothFormProps> = ({ booth, onSuccess }) => {
  const { data: companies, isLoading } = useCompanyGetAllPublic();

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
      options: Array.prototype.concat(
        ['-'],
        companies?.map((company) => company.name),
      ),
      defaultValue: companies?.find(
        (company) => company.id === booth?.companyId,
      )?.name,
    },
  ];

  const form = useForm<BoothUpdateDto>({
    resolver: classValidatorResolver(BoothUpdateDto),
  });
  name;

  return (
    booth &&
    !isLoading && (
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
                  formData.companyName !== '-'
                    ? companies?.find(
                        (company) => company.name === formData.companyName,
                      )?.id
                    : -1,
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
    )
  );
};

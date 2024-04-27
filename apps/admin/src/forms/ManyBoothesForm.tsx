import { CompanyCategory, CreateManyBoothsDto } from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { useCreateManyBoothes } from '../api/booth/useCreateManyBoothes';
import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { Question, QuestionType } from '../types/question';

export const ManyBoothesForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const createManyBoothes = useCreateManyBoothes();

  const questions: Question[] = [
    {
      id: 'category',
      type: QuestionType.Select,
      title: 'Kategorija',
      options: Object.values(CompanyCategory),
    },
    {
      id: 'amount',
      type: QuestionType.Number,
      title: 'Broj štandova',
    },
  ];

  const form = useForm<CreateManyBoothsDto>({
    resolver: classValidatorResolver(CreateManyBoothsDto),
  });

  return (
    <div>
      {questions.map((q) => (
        <InputHandler question={q} form={form} key={q.id} />
      ))}

      <Button
        onClick={form.handleSubmit(async (data) => {
          await createManyBoothes.mutateAsync(data);
          onSuccess && onSuccess();
        })}>
        Dodaj
      </Button>
    </div>
  );
};

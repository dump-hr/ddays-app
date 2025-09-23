import { BoothCreateManyDto, CompanyCategory } from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { useCreateManyBooths } from '../api/booth/useCreateManyBooths';
import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { Question, QuestionType } from '../types/question';

export const ManyBoothsForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const createManyBooths = useCreateManyBooths();

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

  const form = useForm<BoothCreateManyDto>({
    resolver: classValidatorResolver(BoothCreateManyDto),
  });

  return (
    <div>
      {questions.map((q) => (
        <InputHandler question={q} form={form} key={q.id} />
      ))}

      <Button
        onClick={form.handleSubmit(async (data) => {
          await createManyBooths.mutateAsync(data);
          onSuccess?.();
        })}>
        Dodaj
      </Button>
    </div>
  );
};

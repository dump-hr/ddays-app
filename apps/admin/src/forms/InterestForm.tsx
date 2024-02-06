import { InterestModifyDto, Theme } from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { useInterestGetOne } from '../api/interest/useInterestGetOne';
import { InputHandler } from '../components/InputHandler';
import { Question, QuestionType } from '../types/question';

type InterestFormProps = {
  id?: number;
  onSuccess: () => void;
};

export const InterestForm: React.FC<InterestFormProps> = ({
  id,
  onSuccess,
}) => {
  const { data: interest, isLoading } = useInterestGetOne(id);

  const questions: Question[] = [
    {
      id: 'name',
      type: QuestionType.Field,
      title: 'Ime',
      defaultValue: interest?.name,
    },
    {
      id: 'theme',
      type: QuestionType.Select,
      title: 'Područje interesa',
      options: Object.values(Theme),
      defaultValue: interest?.theme,
    },
  ];

  const form = useForm<InterestModifyDto>({
    resolver: classValidatorResolver(InterestModifyDto),
  });

  if (id && isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {questions.map((q) => (
        <InputHandler question={q} form={form} key={q.id} />
      ))}
    </>
  );
};

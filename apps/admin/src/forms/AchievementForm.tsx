import { AchievementModifyDto } from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { useAchievementCreate } from '../api/achievement/useAchievementCreate';
import { useAchievementGetOne } from '../api/achievement/useAchievementGetOne';
import { useAchievementUpdate } from '../api/achievement/useAchievementUpdate';
import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { Question, QuestionType } from '../types/question';

type AchievementFormProps = {
  id?: number;
  onSuccess: () => void;
};

export const AchievementForm: React.FC<AchievementFormProps> = ({
  id,
  onSuccess,
}) => {
  const { data: achievement, isLoading } = useAchievementGetOne(id);

  const createAchievement = useAchievementCreate();
  const updateAchievement = useAchievementUpdate();

  const questions: Question[] = [
    {
      id: 'name',
      type: QuestionType.Field,
      title: 'Ime',
      defaultValue: achievement?.name,
    },
    {
      id: 'description',
      type: QuestionType.Field,
      title: 'Description',
      defaultValue: achievement?.description,
    },
    {
      id: 'points',
      type: QuestionType.Number,
      title: 'Points',
      defaultValue: achievement?.points,
    },
    {
      id: 'is-hidden',
      type: QuestionType.Checkbox,
      title: 'Is Hidden',
      defaultValue: achievement?.isHidden,
    },
  ];

  const form = useForm<AchievementModifyDto>({
    resolver: classValidatorResolver(AchievementModifyDto),
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
            await updateAchievement.mutateAsync({ ...formData, id });
          } else {
            await createAchievement.mutateAsync(formData);
          }
          onSuccess();
        })}>
        Submit
      </Button>
    </div>
  );
};

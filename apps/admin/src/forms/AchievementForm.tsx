import { AchievementDto, AchievementModifyDto } from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { useAchievementCreate } from '../api/achievement/useAchievementCreate';
import { useAchievementUpdate } from '../api/achievement/useAchievementUpdate';
import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { Question, QuestionType } from '../types/question';

import c from './Form.module.scss';

type AchievementFormProps = {
  achievement?: AchievementDto;
  onSuccess: () => void;
};

export const AchievementForm: React.FC<AchievementFormProps> = ({
  achievement,
  onSuccess,
}) => {
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
      id: 'fulfillmentCodeCount',
      type: QuestionType.Number,
      title: 'Fulfillment Code Count',
      defaultValue: achievement?.fulfillmentCodeCount,
    },
    {
      id: 'isHidden',
      type: QuestionType.Checkbox,
      title: 'Is Hidden',
      defaultValue: achievement?.isHidden,
    },
  ];

  const form = useForm<AchievementModifyDto>({
    resolver: classValidatorResolver(AchievementModifyDto),
  });

  return (
    <div className={c.formContainer}>
      {questions.map((q) => (
        <InputHandler question={q} form={form} key={q.id} />
      ))}
      <Button
        onClick={form.handleSubmit(async (formData) => {
          if (achievement) {
            await updateAchievement.mutateAsync({
              ...formData,
              id: achievement.id,
            });
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

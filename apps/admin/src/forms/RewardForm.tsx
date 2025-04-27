import { useForm } from 'react-hook-form';
import { useRewardGetOne } from '../api/reward/useRewardGetOne';
import { Question, QuestionType } from '../types/question';
import { RewardModifyDto } from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { InputHandler } from '../components/InputHandler';
import { Button } from '../components/Button';
import { useRewardCreate } from '../api/reward/useRewardCreate';
import { useRewardUpdate } from '../api/reward/useRewardUpdate';

type RewardFormProps = {
  id?: number;
  onSuccess: () => void;
};

export const RewardForm: React.FC<RewardFormProps> = ({ id, onSuccess }) => {
  const { data: reward, isLoading } = useRewardGetOne(id);

  const createReward = useRewardCreate();
  const updateReward = useRewardUpdate();

  const questions: Question[] = [
    {
      id: 'name',
      type: QuestionType.Field,
      title: 'Naziv',
      defaultValue: reward?.name,
    },
    {
      id: 'description',
      type: QuestionType.TextArea,
      title: 'Opis',
      defaultValue: reward?.description,
    },
  ];

  const form = useForm<RewardModifyDto>({
    resolver: classValidatorResolver(RewardModifyDto),
  });

  if (id && isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {questions.map((q) => {
        return <InputHandler question={q} form={form} key={q.id} />;
      })}

      <Button
        onClick={form.handleSubmit(async (formData) => {
          if (id) {
            await updateReward.mutateAsync({ ...formData, id });
          } else {
            await createReward.mutateAsync(formData);
          }
          onSuccess();
        })}>
        Submit
      </Button>
    </>
  );
};

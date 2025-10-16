import { RewardModifyDto } from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { useRewardCreate } from '../api/reward/useRewardCreate';
import { useRewardGetOne } from '../api/reward/useRewardGetOne';
import { useRewardUpdate } from '../api/reward/useRewardUpdate';
import { useRewardUpdateImage } from '../api/reward/useRewardUpdateImage';
import { useRewardRemoveImage } from '../api/reward/useRewardRemoveImage';

import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { FileUpload } from '../components/FileUpload';
import { Question, QuestionType } from '../types/question';

import c from './Form.module.scss';

type RewardFormProps = {
  id?: number;
  onSuccess: () => void;
};

export const RewardForm: React.FC<RewardFormProps> = ({ id, onSuccess }) => {
  const { data: reward, isLoading } = useRewardGetOne(id);

  const createReward = useRewardCreate();
  const updateReward = useRewardUpdate();
  const updateImage = useRewardUpdateImage();
  const removeImage = useRewardRemoveImage();

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
    defaultValues: {
      name: reward?.name ?? '',
      description: reward?.description ?? '',
    },
  });

  const handleImageUpload = async (files: File[]) => {
    if (!id) return;
    await updateImage.mutateAsync({ id, file: files[0] });
  };

  const handleImageRemove = async () => {
    if (!id) return;
    await removeImage.mutateAsync(id);
  };

  if (id && isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={c.formContainer}>
      {questions.map((q) => (
        <InputHandler question={q} form={form} key={q.id} />
      ))}

      {id && (
        <>
          <p>Slika:</p>
          <FileUpload
            src={reward?.imageUrl}
            handleUpload={handleImageUpload}
            handleRemove={handleImageRemove}
          />
        </>
      )}

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
    </div>
  );
};

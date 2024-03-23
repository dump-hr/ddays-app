import { SpeakerModifyDto } from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { useSpeakerCreate } from '../api/speaker/useSpeakerCreate';
import { useSpeakerGetOne } from '../api/speaker/useSpeakerGetOne';
import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { Question, QuestionType } from '../types/question';

type SpeakerFormProps = {
  id?: number;
  onSuccess: () => void;
};

export const SpeakerForm: React.FC<SpeakerFormProps> = ({ id, onSuccess }) => {
  const { data: speaker, isLoading } = useSpeakerGetOne(id);

  const createSpeaker = useSpeakerCreate();

  const questions: Question[] = [
    {
      id: 'firstName',
      type: QuestionType.Field,
      title: 'Ime',
      defaultValue: speaker?.firstName,
    },
    {
      id: 'lastName',
      type: QuestionType.Field,
      title: 'Prezime',
      defaultValue: speaker?.lastName,
    },
    {
      id: 'title',
      type: QuestionType.Field,
      title: 'Titula',
      defaultValue: speaker?.title,
    },
    {
      id: 'companyId',
      type: QuestionType.Number,
      title: 'CompanyId',
      defaultValue: speaker?.companyId,
    },
  ];

  const form = useForm<SpeakerModifyDto>({
    resolver: classValidatorResolver(SpeakerModifyDto),
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
            return;
          } else {
            await createSpeaker.mutateAsync(formData);
          }
          onSuccess();
        })}>
        Submit
      </Button>
    </>
  );
};

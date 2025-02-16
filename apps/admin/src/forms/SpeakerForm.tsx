import { SpeakerModifyDto } from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { useSpeakerCreate } from '../api/speaker/useSpeakerCreate';
import { useSpeakerGetOne } from '../api/speaker/useSpeakerGetOne';
import { useSpeakerUpdate } from '../api/speaker/useSpeakerUpdate';
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
  const updateSpeaker = useSpeakerUpdate();

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
      title: 'CompanyId (0 for null)',
      defaultValue: speaker?.companyId,
    },
    {
      id: 'linkedinUrl',
      type: QuestionType.Field,
      title: 'LinkedIn',
      defaultValue: speaker?.linkedinUrl,
    },
    {
      id: 'instagramUrl',
      type: QuestionType.Field,
      title: 'Instagram',
      defaultValue: speaker?.instagramUrl,
    },
    {
      id: 'description',
      type: QuestionType.TextArea,
      title: 'Opis (sa instagrama)',
      defaultValue: speaker?.description,
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
            await updateSpeaker.mutateAsync({ ...formData, id });
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

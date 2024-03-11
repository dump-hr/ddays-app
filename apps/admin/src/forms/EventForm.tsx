import { EventModifyDto, EventType, Theme } from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { useEventCreate } from '../api/event/useEventCreate';
import { useEventGetOne } from '../api/event/useEventGetOne';
import { useEventUpdate } from '../api/event/useEventUpdate';
import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { Question, QuestionType } from '../types/question';

type EventFormProps = {
  id?: number;
  onSuccess: () => void;
};

export const EventForm: React.FC<EventFormProps> = ({ id, onSuccess }) => {
  const { data: event, isLoading } = useEventGetOne(id);

  const createEvent = useEventCreate();
  const updateEvent = useEventUpdate();

  const questions: Question[] = [
    {
      id: 'name',
      type: QuestionType.Field,
      title: 'Naziv',
      defaultValue: event?.name,
    },
    {
      id: 'description',
      type: QuestionType.TextArea,
      title: 'Opis',
      defaultValue: event?.description,
    },
    {
      id: 'type',
      type: QuestionType.Select,
      title: 'Tip',
      options: Object.values(EventType),
      defaultValue: event?.type,
    },
    {
      id: 'theme',
      type: QuestionType.Select,
      title: 'Područje interesa',
      options: Object.values(Theme),
      defaultValue: event?.theme,
    },
    {
      id: 'startsAt',
      type: QuestionType.DateTime,
      title: 'Početak',
      defaultValue: event?.startsAt,
    },
    {
      id: 'endsAt',
      type: QuestionType.DateTime,
      title: 'Kraj',
      defaultValue: event?.endsAt,
    },
    {
      id: 'requirements',
      type: QuestionType.TextArea,
      title: 'Zahtjevi',
      defaultValue: event?.requirements,
    },
    {
      id: 'footageLink',
      type: QuestionType.Field,
      title: 'Link za sinmke',
      defaultValue: event?.footageLink,
    },
    {
      id: 'maxParticipants',
      type: QuestionType.Number,
      defaultValue: event?.maxParticipants,
    },
  ];

  const form = useForm<EventModifyDto>({
    resolver: classValidatorResolver(EventModifyDto),
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
            await updateEvent.mutateAsync({ ...formData, id });
          } else {
            await createEvent.mutateAsync(formData);
          }
          onSuccess();
        })}>
        Submit
      </Button>
    </>
  );
};

import { CodeDto, CodeModifyDto } from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { useCodeCreate } from '../api/code/useCodeCreate';
import { useCodeUpdate } from '../api/code/useCodeUpdate';
import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { Question, QuestionType } from '../types/question';

type CodeFormProps = {
  code?: CodeDto;
  onSuccess: () => void;
};

export const CodeForm: React.FC<CodeFormProps> = ({ code, onSuccess }) => {
  const createCode = useCodeCreate();
  const updateCode = useCodeUpdate();

  const questions: Question[] = [
    {
      id: 'value',
      type: QuestionType.Field,
      title: 'Kod',
      defaultValue: code?.value,
    },
    {
      id: 'description',
      type: QuestionType.Field,
      title: 'Opis',
      defaultValue: code?.description,
    },
    {
      id: 'points',
      type: QuestionType.Number,
      title: 'Bodovi',
      defaultValue: code?.points,
    },
    {
      id: 'is-active',
      type: QuestionType.Checkbox,
      title: 'Aktivan',
      defaultValue: code?.isActive,
    },
    {
      id: 'is-single-use',
      type: QuestionType.Checkbox,
      title: 'Jednokratan',
      defaultValue: code?.isSingleUse,
    },
    {
      id: 'has-page',
      type: QuestionType.Checkbox,
      title: 'Ima stranicu',
      defaultValue: code?.hasPage,
    },
    {
      id: 'expiration-date',
      type: QuestionType.Date,
      title: 'Datum isteka',
      defaultValue: code?.expirationDate?.toString(),
    },
  ];

  const form = useForm<CodeModifyDto>({
    resolver: classValidatorResolver(CodeModifyDto),
  });

  return (
    <div>
      {questions.map((q) => (
        <InputHandler question={q} form={form} key={q.id} />
      ))}
      <Button
        onClick={form.handleSubmit(async (formData) => {
          if (code) {
            await updateCode.mutateAsync({
              ...formData,
              id: code.id,
            });
          } else {
            await createCode.mutateAsync(formData);
          }
          onSuccess();
        })}>
        Submit
      </Button>
    </div>
  );
};

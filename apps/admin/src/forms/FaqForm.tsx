import {
  FrequentlyAskedQuestionDto,
  FrequentlyAskedQuestionModifyDto,
} from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { useFaqCreate } from '../api/faq/useFaqCreate';
import { useFaqUpdate } from '../api/faq/useFaqUpdate';
import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { Question, QuestionType } from '../types/question';

import c from './Form.module.scss';

type FaqFormProps = {
  faq?: FrequentlyAskedQuestionDto;
  onSuccess: () => void;
};

export const FaqForm: React.FC<FaqFormProps> = ({ faq, onSuccess }) => {
  const createFaq = useFaqCreate();
  const updateFaq = useFaqUpdate();

  const questions: Question[] = [
    {
      id: 'question',
      type: QuestionType.Field,
      title: 'Pitanje',
      defaultValue: faq?.question,
    },
    {
      id: 'answer',
      type: QuestionType.TextArea,
      title: 'Odgovor',
      rows: 5,
      defaultValue: faq?.answer,
    },
  ];

  const form = useForm<FrequentlyAskedQuestionModifyDto>({
    resolver: classValidatorResolver(FrequentlyAskedQuestionModifyDto),
  });

  return (
    <div className={c.formContainer}>
      {questions.map((q) => (
        <InputHandler question={q} form={form} key={q.id} />
      ))}
      <Button
        onClick={form.handleSubmit(async (formData) => {
          if (faq) {
            await updateFaq.mutateAsync({ ...formData, id: faq.id });
          } else {
            await createFaq.mutateAsync(formData);
          }
          onSuccess();
        })}>
        Submit
      </Button>
    </div>
  );
};

import {
  PotentialSponsorModifyDto,
  SponsorStatus,
  Tier,
} from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { usePotentialSponsorCreate } from '../api/potential-sponsor/usePotentialSponsorCreate';
import { usePotentialSponsorGetOne } from '../api/potential-sponsor/usePotentialSponsorGetOne';
import { usePotentialSponsorUpdate } from '../api/potential-sponsor/usePotentialSponsorUpdate';
import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { Question, QuestionType } from '../types/question';

import c from './Form.module.scss';
import { useEffect } from 'react';

type PotentialSponsorFormProps = {
  id?: number;
  onSuccess: () => void;
};

export const PotentialSponsorForm: React.FC<PotentialSponsorFormProps> = ({
  id,
  onSuccess,
}) => {
  const { data: potentialSponsor, isLoading } = usePotentialSponsorGetOne(id);

  const createPotentialSponsor = usePotentialSponsorCreate();
  const updatePotentialSponsor = usePotentialSponsorUpdate();

  const questions: Question[] = [
    {
      id: 'company',
      type: QuestionType.Field,
      title: 'Firma',
      defaultValue: potentialSponsor?.company,
    },
    {
      id: 'email',
      type: QuestionType.Field,
      title: 'Kontakt mail',
      defaultValue: potentialSponsor?.email,
    },
    {
      id: 'representative',
      type: QuestionType.Field,
      title: 'Predstavnik (opcionalno)',
      defaultValue: potentialSponsor?.representative,
    },
    {
      id: 'comment',
      type: QuestionType.TextArea,
      title: 'Komentar (opcionalno)',
      defaultValue: potentialSponsor?.comment,
    },
  ];

  const form = useForm<PotentialSponsorModifyDto>({
    resolver: classValidatorResolver(PotentialSponsorModifyDto),
    defaultValues: {
      tier: potentialSponsor?.tier || Tier.DEFAULT,
      company: potentialSponsor?.company || '',
      email: potentialSponsor?.email || '',
      representative: potentialSponsor?.representative || '',
      comment: potentialSponsor?.comment || '',
      status: potentialSponsor?.status || SponsorStatus.DID_NOT_CONTACT,
    },
  });

  useEffect(() => {
    form.reset(potentialSponsor);
  }, [potentialSponsor, form]);

  if (id && isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={c.formContainer}>
      {questions.map((q) => {
        return <InputHandler question={q} form={form} key={q.id} />;
      })}

      <Button
        onClick={form.handleSubmit(async (formData) => {
          if (id) {
            await updatePotentialSponsor.mutateAsync({ ...formData, id });
          } else {
            await createPotentialSponsor.mutateAsync(formData);
          }
          onSuccess();
        })}>
        Submit
      </Button>
    </div>
  );
};

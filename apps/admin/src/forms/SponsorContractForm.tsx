import { useEffect } from 'react';

import { SponsorContractModifyDto } from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { Question, QuestionType } from '../types/question';

import c from './Form.module.scss';
import { useSponsorContractsGetOne } from '../api/sponsor-contracts/useSponsorContractsGetOne';
import { useSponsorContractsUpdate } from '../api/sponsor-contracts/useSponsorContractsUpdate';

type SponsorContractFormProps = {
  id?: number;
  onSuccess: () => void;
};

export const SponsorContractForm: React.FC<SponsorContractFormProps> = ({
  id,
  onSuccess,
}) => {
  const { data: sponsorContract, isLoading } = useSponsorContractsGetOne(id);

  const updateSponsorContract = useSponsorContractsUpdate();

  const questions: Question[] = [
    {
      id: 'name',
      type: QuestionType.Field,
      title: 'Ime firme d.o.o',
      defaultValue: sponsorContract?.name,
    },
    {
      id: 'address',
      type: QuestionType.Field,
      title: 'Adresa',
      defaultValue: sponsorContract?.address,
    },
    {
      id: 'oib',
      type: QuestionType.Field,
      title: 'OIB',
      defaultValue: sponsorContract?.oib,
    },
    {
      id: 'companyRepresentative',
      type: QuestionType.Field,
      title: 'Zastupnik ime',
      defaultValue: sponsorContract?.companyRepresentative,
    },
    {
      id: 'companyRepresentativePosition',
      type: QuestionType.Field,
      title: 'Zastupnik pozicija',
      defaultValue: sponsorContract?.companyRepresentativePosition,
    },
  ];

  const form = useForm<SponsorContractModifyDto>({
    resolver: classValidatorResolver(SponsorContractModifyDto),
    defaultValues: {
      name: sponsorContract?.name,
      address: sponsorContract?.address,
      oib: sponsorContract?.oib,
      companyRepresentative: sponsorContract?.companyRepresentative,
      companyRepresentativePosition:
        sponsorContract?.companyRepresentativePosition,
    },
  });

  useEffect(() => {
    form.reset(sponsorContract);
  }, [sponsorContract, form]);

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
            await updateSponsorContract.mutateAsync({ ...formData, id });
          }
          onSuccess();
        })}>
        Submit
      </Button>
    </div>
  );
};

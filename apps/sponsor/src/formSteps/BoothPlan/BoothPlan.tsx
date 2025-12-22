import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useCompanyUpdateBoothPlan } from '../../api/company/useCompanyUpdateBoothPlan';
import { Input } from '../../components/Input';
import { FormComponent } from '../../types/form';
import c from './BoothPlan.module.scss';

export const BoothPlan: FormComponent = ({ close }) => {
  const ref = useRef(true);
  const [boothPlan, setBoothPlan] = useState('');
  const [displayErrors, setDisplayErrors] = useState(false);

  const { data: company } = useCompanyGetCurrentPublic();
  const { mutateAsync: updateBoothPlan } = useCompanyUpdateBoothPlan();

  useEffect(() => {
    if (ref.current && company?.boothPlan) {
      setBoothPlan(company.boothPlan);
      ref.current = false;
    }
  }, [company]);

  const handleSave = async () => {
    if (!boothPlan) {
      toast.error('Molimo unesite plan štanda.');
      setDisplayErrors(true);
      return;
    }

    if (company?.id) {
      try {
        await updateBoothPlan({
          boothPlan: boothPlan,
        });
        toast.success('Plan štanda uspješno spremljen.');
        close();
      } catch (e) {
        toast.error('Došlo je do greške prilikom spremanja.');
      }
    }
  };

  return (
    <div className={c.container}>
      <div className={c.infoContainer}>
        <h1 className={c.title}>Plan štanda</h1>
        <p className={c.description}>
          Unesite kratak opis sadržaja Vašeg štanda (promotivni materijali,
          igrice, nagrade, i sl.)
        </p>
      </div>

      <div className={c.inputContainer}>
        <Input
          value={boothPlan}
          label='Plan štanda'
          onChange={(value) => setBoothPlan(value)}
          textArea
          className={c.textArea}
        />
        {displayErrors && !boothPlan && (
          <span className={c.error}>Ovo polje je obavezno.</span>
        )}
      </div>

      <div className={c.buttonsContainer}>
        <button onClick={handleSave} className={clsx(c.button, c.primary)}>
          Spremi
        </button>
      </div>
    </div>
  );
};

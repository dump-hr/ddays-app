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
        <h1 className={c.title}>Dodaj plan štanda</h1>
        <p className={c.description}>
          Primjer: Playstation 5 (Fifa), kviz o digitalnom marketingu (nagrada
          Kindle), skrivena šifra na štandu, kolo sreće (nagrada knjiga po
          izboru)
        </p>
      </div>

      <div className={c.inputContainer}>
        <Input
          value={boothPlan}
          label='Plan štanda'
          onChange={(value) => setBoothPlan(value)}
          textArea
          className={c.textArea}
          maxLength={150}
        />
        <span className={c.charCount}>{boothPlan.length}/150</span>
      </div>

      <div className={c.buttonsContainer}>
        <button onClick={handleSave} className={clsx(c.button, c.primary)}>
          Spremi
        </button>
      </div>
    </div>
  );
};

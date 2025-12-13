import { SwagBagModifyToCompanyDto } from '@ddays-app/types';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useSwagBagGetByCompany } from '../../api/swagBag/useSwagBagGetByCompany';
import { useSwagBagUpdateForCompany } from '../../api/swagBag/useSwagBagUpdateForCompany';
import { Input } from '../../components/Input';
import { FormComponent } from '../../types/form';
import c from './SwagBag.module.scss';

export const SwagBag: FormComponent = ({ close }) => {
  const ref = useRef(true);

  const [swagBags, setSwagBags] = useState<SwagBagModifyToCompanyDto[]>([]);
  const [displayErrors, setDisplayErrors] = useState(false);

  const { data: company } = useCompanyGetCurrentPublic();
  const { data: companySwagBags } = useSwagBagGetByCompany(company?.id);

  const { mutateAsync: updateSponsorSwagBags } = useSwagBagUpdateForCompany();

  useEffect(() => {
    if (swagBags.length) return;
    if (ref.current) {
      setSwagBags(companySwagBags ?? []);
      ref.current = false;
    }
  }, [companySwagBags, swagBags]);

  const handleAdd = () => {
    setSwagBags((prev) => [
      ...prev,
      {
        quantity: 0,
        name: '',
      },
    ]);
  };

  const handleRemove = (idToRemove?: number) => {
    setSwagBags((prev) => prev.filter((_, i) => i !== idToRemove));
  };

  const handleSave = async () => {
    const swagBagsToSave = swagBags.filter(isValid);

    if (swagBagsToSave.length === swagBags.length) {
      if (company?.id) {
        await updateSponsorSwagBags({
          companyId: company.id,
          swagBags: swagBagsToSave,
        });
      } else {
        toast.error('Company ID is missing.');
      }
      close();
      return;
    }

    toast.error('Nisu uneseni svi potrebni podaci.');
    setDisplayErrors(true);
  };

  const isValid = (swagBag: SwagBagModifyToCompanyDto) => {
    return swagBag.quantity > 0 && swagBag.name !== '';
  };

  return (
    <div className={c.container}>
      <div className={c.infoContainer}>
        <h1 className={c.title}>Swag bag materijali</h1>
        <p className={c.description}>
          Primjer: 320 x naočale za sunce s logotipom (plave i crvene)
        </p>
      </div>

      <div className={c.jobsContainer}>
        {swagBags.map(({ quantity, name }, index) => (
          <div key={index} className={c.inputContainer}>
            <div className={c.subtitleContainer}>
              <h2 className={c.subtitle}>
                #{index + 1} Materijal{' '}
                {!isValid({ quantity, name }) && displayErrors && (
                  <span className={c.error}>(nepotpuni podaci)</span>
                )}
              </h2>
              <span onClick={() => handleRemove(index)} className={c.label}>
                Ukloni
              </span>
            </div>
            <Input
              value={quantity.toString() ?? ''}
              label='Količina'
              onChange={(value) => {
                setSwagBags((prev) => {
                  const newSwagBags = [...prev];
                  newSwagBags[index].quantity = Number(value);
                  return newSwagBags;
                });
              }}
            />
            <Input
              value={name ?? ''}
              label='Materijal'
              onChange={(value) => {
                setSwagBags((prev) => {
                  const newSwagBags = [...prev];
                  newSwagBags[index].name = value;
                  return newSwagBags;
                });
              }}
            />
          </div>
        ))}
      </div>

      <div>
        {swagBags.length < 3 && (
          <button onClick={handleAdd} className={clsx(c.button, c.secondary)}>
            Dodaj materijal
          </button>
        )}
        <button onClick={handleSave} className={clsx(c.button, c.primary)}>
          Spremi
        </button>
      </div>
    </div>
  );
};

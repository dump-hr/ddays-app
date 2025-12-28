import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useCompanyUpdateEquipment } from '../../api/company/useCompanyUpdateEquipment';
import { Input } from '../../components/Input';
import { FormComponent } from '../../types/form';
import c from './BoothEquipment.module.scss';

export type EquipmentItem = {
  name: string;
  quantity: number;
};

export const BoothEquipment: FormComponent = ({ close }) => {
  const ref = useRef(true);

  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [displayErrors, setDisplayErrors] = useState(false);

  const { data: company } = useCompanyGetCurrentPublic();
  const { mutateAsync: updateEquipment } = useCompanyUpdateEquipment();

  useEffect(() => {
    if (items.length || !ref.current) return;

    if (!company?.equipment) {
      ref.current = false;
      return;
    }

    try {
      const parsed = JSON.parse(company.equipment);

      if (Array.isArray(parsed)) setItems(parsed);
    } catch (e) {
      console.error('Failed to parse equipment', e);
    } finally {
      ref.current = false;
    }
  }, [company?.equipment, items.length]);

  const handleAdd = () => {
    setItems((prev) => [
      ...prev,
      {
        quantity: 0,
        name: '',
      },
    ]);
  };

  const handleRemove = (indexToRemove: number) => {
    setItems((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const isValid = (item: EquipmentItem) => {
    return item.quantity > 0 && item.name !== '';
  };

  const handleSave = async () => {
    const itemsToSave = items.filter(isValid);

    if (itemsToSave.length === items.length) {
      await updateEquipment({
        equipment: JSON.stringify(itemsToSave),
      });
      toast.success('Podaci uspješno spremljeni.');
      close();
      return;
    }

    toast.error('Nisu uneseni svi potrebni podaci.');
    setDisplayErrors(true);
  };

  return (
    <div className={c.container}>
      <div className={c.infoContainer}>
        <h1 className={c.title}>Materijali potrebni za štand</h1>
        <p className={c.description}>
          Oprema za štand su školske klupe, stolnjaci, stolice - napišite što
          vam je potrebno i u kojoj količini. Ako ste izrazili želju za tepihom,
          on je već podrazumijevan i čekat će vas na štandu. Svaki štand imat će
          produžni kabel s 4 do 5 utičnica, ako imate preferencu za to, također
          naznačite.
        </p>
      </div>

      <div className={c.jobsContainer}>
        {items.map(({ quantity, name }, index) => (
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
                setItems((prev) => {
                  if (isNaN(Number(value))) return prev;
                  if (Number(value) > 10000) return prev;
                  const newItems = [...prev];
                  newItems[index].quantity = Number(value);
                  return newItems;
                });
              }}
            />
            <Input
              value={name ?? ''}
              label='Materijal'
              onChange={(value) => {
                setItems((prev) => {
                  if (value.length > 50) return prev;
                  const newItems = [...prev];
                  newItems[index].name = value;
                  return newItems;
                });
              }}
            />
          </div>
        ))}
      </div>

      <div>
        {items.length < 10 && (
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

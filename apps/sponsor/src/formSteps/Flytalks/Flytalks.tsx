import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useCompanyUpdateFlyTalkHolders } from '../../api/company/useCompanyUpdateFlytalkHolders';
import { Input } from '../../components/Input';
import { FormComponent } from '../../types/form';
import c from './Flytalks.module.scss';

interface Holder {
  fullName: string;
  email: string;
}

export const FlyTalks: FormComponent = ({ close }) => {
  const [flytalkParticipation, setFlytalkParticipation] = useState<
    boolean | null
  >(null);
  const [holders, setHolders] = useState<Holder[]>([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const { data: company, error, isLoading } = useCompanyGetCurrentPublic();
  const updateFlytalks = useCompanyUpdateFlyTalkHolders();

  useEffect(() => {
    if (company) {
      setFlytalkParticipation(!!company.flytalkParticipation);
      setHolders(
        company.flytalkHolders
          ? typeof company.flytalkHolders === 'string'
            ? (JSON.parse(company.flytalkHolders) as Holder[])
            : (company.flytalkHolders as unknown as Holder[])
          : [],
      );
    }
  }, [company]);

  if (error) return <div>{error.toString()}</div>;

  if (isLoading || flytalkParticipation === null) return <div>Loading...</div>;

  const handleAddHolder = () => {
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      toast.error('Unesite valjano ime i prezime');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      toast.error('Unesite valjanu email adresu');
      return;
    }

    setHolders([...holders, { fullName: trimmedName, email: trimmedEmail }]);
    setFullName('');
    setEmail('');
  };

  const handleRemoveHolder = (emailToRemove: string) => {
    setHolders(holders.filter((h) => h.email !== emailToRemove));
  };

  const handleSubmit = async () => {
    await updateFlytalks.mutateAsync({
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      flytalkHolders: JSON.stringify(holders) as any,
      flytalkParticipation,
    });
    close();
  };

  return (
    <div className={c.container}>
      <div>
        <h1 className={c.title}>Fly Talks</h1>
        <p className={c.description}>
          Ovdje možete urediti informacije vezane uz vaše sudjelovanje na Fly
          Talks-ima.
        </p>

        <div className={c.inputContainer}>
          <label>Želite li sudjelovati na Fly Talks-ima?</label>
          <div className={c.choiceButtons} style={{ marginBottom: '32px' }}>
            <button
              type='button'
              className={`${c.choiceButton} ${flytalkParticipation ? c.activeYes : ''}`}
              onClick={() => setFlytalkParticipation(true)}>
              Da
            </button>
            <button
              type='button'
              className={`${c.choiceButton} ${!flytalkParticipation ? c.activeNo : ''}`}
              onClick={() => setFlytalkParticipation(false)}>
              Ne
            </button>
          </div>
        </div>

        {flytalkParticipation && (
          <div className={c.inputContainer}>
            <label>Osobe koje vam održavaju Fly Talks-e</label>

            <ul className={c.speakerList}>
              {holders.map((holder) => (
                <div key={holder.email} className={c.speakerRow}>
                  <li className={c.speakerItem}>
                    <span>{holder.fullName}</span>
                    <span style={{ opacity: 0.7, marginLeft: '8px' }}>
                      {holder.email}
                    </span>
                  </li>
                  <button
                    type='button'
                    onClick={() => handleRemoveHolder(holder.email)}
                    className={c.removeSpeakerButton}>
                    Ukloni
                  </button>
                </div>
              ))}
            </ul>

            <div className={c.addFlytalkHolderContainer}>
              <div
                style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <Input
                  value={fullName}
                  onChange={(val) => setFullName(val)}
                  label='Ime i prezime'
                />
                <Input
                  value={email}
                  onChange={(val) => setEmail(val)}
                  label='Email'
                />
              </div>
              <button
                onClick={handleAddHolder}
                className={`${c.smallButton} ${c.button}`}>
                Dodaj osobu
              </button>
            </div>
          </div>
        )}
      </div>
      <button onClick={handleSubmit} className={c.button}>
        Spremi
      </button>
    </div>
  );
};

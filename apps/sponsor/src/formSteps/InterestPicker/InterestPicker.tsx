import { useGetSponsorInterest } from '../../api/useGetSponsorInterests';
import { FormComponent } from '../../types/form';
import c from './InterestPicker.module.scss';

const InterestPicker: FormComponent = ({ close }) => {
  const { data } = useGetSponsorInterest();
  console.log(data);

  return (
    <div className={c.container}>
      <h1 className={c.title}>App Career matching</h1>
      <p className={c.description}>
        Odaberite tehnologije i područja koja najbolje opisuju vašu tvrtku.
        Selekcija će nam olakšati povezivanje s kandidatima čiji interesi i
        sposobnosti odgovaraju potrebama vaše tvrtke.
      </p>

      <button onClick={close} className={c.button}>
        Nastavi
      </button>
    </div>
  );
};

export default InterestPicker;

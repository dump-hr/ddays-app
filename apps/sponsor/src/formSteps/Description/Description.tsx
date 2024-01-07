import { FormComponent } from '@ddays-app/types';
import { useState } from 'react';

import TextArea from '../../components/TextArea';
import c from './Description.module.scss';

const isGold = true;

const Description: FormComponent = ({ close }) => {
  const [aboutCompanyText, setAboutCompanyText] = useState('');
  const [aboutProjectsText, setAboutProjectsText] = useState('');

  return (
    <div className={c.container}>
      <h1 className={c.title}>O tvrtki</h1>
      <p className={c.description}>
        Ispunite detalje o svojoj tvrtki. Pružite kratak pregled vaših
        projekata, rješenja ili usluga koje nudite. Opišite prilike koje nudite
        studentima, uključujući ljetne prakse i otvorene junior pozicije.
      </p>
      <div className={c.inputContainer}>
        <TextArea
          value={aboutCompanyText}
          onChange={(value) => setAboutCompanyText(value)}
          limit={70}
          deviation={5}
          label='Opis tvrtke'
        />
        {isGold && (
          <TextArea
            value={aboutProjectsText}
            onChange={(value) => setAboutProjectsText(value)}
            limit={70}
            deviation={5}
            label='Poslovne prilike, o poslovima i projektima'
          />
        )}
      </div>
      <button onClick={close} className={c.button}>
        Nastavi
      </button>
    </div>
  );
};

export default Description;

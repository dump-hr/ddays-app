import { useDeviceType } from '../../../hooks/UseDeviceType';
import Button from '../../Button/Button';
import c from './ConfirmEmail.module.scss';
import closeIcon from './../../../assets/icons/remove-icon-black.svg';

export const ConfirmEmail = () => {
  const { isMobile } = useDeviceType({});
  return (
    <div className={c.confirmEmail}>
      <div className={c.confirmEmailUpper}>
        <h2>Potvrdi svoj e-mail {isMobile && <img src={closeIcon}></img>}</h2>
        <p>
          Poslali smo ti e-mail na mikejla@dump.hr da potvrdimo ispravnost
          unesene adrese. Nakon što se e-mail pojavi u tvom sandučiću, klikni na
          link kako bi registracija bila uspješna.
        </p>
      </div>

      <Button children='Potvrdi email' variant='orange' />
    </div>
  );
};

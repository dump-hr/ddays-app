import { useDeviceType } from '../../../hooks/UseDeviceType';
import Button from '../../Button/Button';
import c from './ConfirmEmail.module.scss';
import CloseIcon from '@/assets/icons/remove-icon-black.svg';
import { useNavigate } from 'react-router-dom';

export const ConfirmEmail = () => {
  const { isMobile } = useDeviceType({});
  const navigate = useNavigate();
  return (
    <div className={c.confirmEmail}>
      <div className={c.confirmEmailUpper}>
        <h2>
          Potvrdi svoj e-mail
          {isMobile && (
            <img src={CloseIcon} onClick={() => navigate('/app')}></img>
          )}
        </h2>
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

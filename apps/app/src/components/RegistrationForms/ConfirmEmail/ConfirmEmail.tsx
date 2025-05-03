import { useDeviceType } from '../../../hooks/UseDeviceType';
import Button from '../../Button/Button';
import c from './ConfirmEmail.module.scss';
import CloseIcon from '@/assets/icons/remove-icon-black.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PointModifierPopup from '@/pages/Home/popups/PointModifierPopup';

export const ConfirmEmail = () => {
  const { isMobile } = useDeviceType({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPointsPopup, setShowPointsPopup] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      validateToken(token);
    }
  }, [searchParams]);

  const validateToken = async (token: string) => {
    try {
      const response = await fetch(
        `/api/email/validate-confirmation?token=${token}`,
      );
      const data = await response.json();

      if (data.success) {
        toast.success('Email uspješno potvrđen');
        setShowPointsPopup(true);
      } else {
        toast.error(data.message || 'Greška pri potvrdi emaila');
      }
    } catch (error) {
      console.error('Greška pri validaciji tokena:', error);
      toast.error('Došlo je do greške pri potvrdi emaila');
    }
  };

  const handleClosePointsPopup = () => {
    setShowPointsPopup(false);
    navigate('/app');
  };

  return (
    <div className={c.confirmEmail}>
      <div className={c.confirmEmailUpper}>
        <h2>
          Potvrdi svoj e-mail
          {isMobile && (
            <img src={CloseIcon} onClick={() => navigate('/login')}></img>
          )}
        </h2>
        <p>
          Poslali smo ti e-mail da potvrdimo ispravnost unesene adrese. Nakon
          što se e-mail pojavi u tvom sandučiću, klikni na link kako bi
          registracija bila uspješna.
        </p>
      </div>

      <Button
        children='Potvrdi email'
        variant='orange'
        onClick={() => {
          toast.error('Otvori link u emailu koji smo ti poslali');
        }}
      />

      <PointModifierPopup
        isOpen={showPointsPopup}
        points={10}
        closePopup={handleClosePointsPopup}
      />
    </div>
  );
};

import { useDeviceType } from '../../../hooks/UseDeviceType';
import Button from '../../Button/Button';
import c from './ConfirmEmail.module.scss';
import CloseIcon from '@/assets/icons/remove-icon-black.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PointModifierPopup from '@/pages/Home/popups/PointModifierPopup';
import { useSendConfirmationEmail } from '@/api/email/useSendConfirmationEmail';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';
import { RouteNames } from '@/router/routes';

const COUNTDOWN_TIME = 60; // 60 seconds

export const ConfirmEmail = () => {
  const { isMobile } = useDeviceType({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPointsPopup, setShowPointsPopup] = useState(false);

  const { mutate: sendConfirmationEmail } = useSendConfirmationEmail();
  const { data: user } = useLoggedInUser();

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [lastSentTime, setLastSentTime] = useState<number | null>(null);

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
        setShowPointsPopup(true);
      } else {
        toast.error(data.message || 'Greška pri potvrdi emaila');
      }
    } catch (error) {
      console.error('Greška pri validaciji tokena:', error);
      toast.error('Došlo je do greške pri potvrdi emaila');
    }
  };

  const handleSendEmail = () => {
    if (!user?.email) {
      toast.error('Greška pri slanju emaila.');
      return;
    }

    sendConfirmationEmail(user?.email);
    const currentTime = Date.now();
    setLastSentTime(currentTime);
    setTimeLeft(COUNTDOWN_TIME);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (lastSentTime) {
      const elapsed = Math.floor((Date.now() - lastSentTime) / 1000);
      const remainingTime = Math.max(COUNTDOWN_TIME - elapsed, 0);
      setTimeLeft(remainingTime);
    }
  }, [lastSentTime]);

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
            <img
              src={CloseIcon}
              onClick={() => navigate(RouteNames.LOGIN)}
              style={{ cursor: 'pointer' }}
            />
          )}
        </h2>
        <p>
          Poslali smo ti e-mail {user?.email ? `na ${user.email}` : ''} da
          potvrdimo ispravnost adrese. Nakon što se e-mail pojavi u tvom
          sandučiću, klikni na link kako bi registracija bila uspješna.
        </p>
      </div>

      <Button
        children={
          timeLeft > 0 ? `Pošalji ponovno (${timeLeft} s)` : 'Pošalji ponovno'
        }
        variant='orange'
        onClick={handleSendEmail}
        disabled={timeLeft > 0}
      />

      <PointModifierPopup
        isOpen={showPointsPopup}
        points={10}
        closePopup={handleClosePointsPopup}
      />
    </div>
  );
};

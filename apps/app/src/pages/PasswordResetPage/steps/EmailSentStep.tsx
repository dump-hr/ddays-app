import c from '../PasswordResetPage.module.scss';
import Button from '../../../components/Button';
import { Header } from '../components/Header';
import closeIcon from '../../../assets/icons/close-icon.svg';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../../router/routes';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { sendVerificationEmail } from '../../../helpers/handleVerificationSent';

const COUNTDOWN_TIME = 60; // 60 seconds

interface EmailSentStepProps {
  email: string;
}

export const EmailSentStep = ({ email }: EmailSentStepProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [lastSentTime, setLastSentTime] = useState<number | null>(null);

  const handleSendEmail = async () => {
    if (!email) {
      toast.error('Greška pri slanju emaila.');
      return;
    }

    await sendVerificationEmail(
      email,
      (error) => toast.error(error),
      () => toast.success('Email je uspješno poslan!'),
    );
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

  return (
    <>
      <Header showDuck={true} />
      <div className={c.container}>
        <div className={c.titleContainer}>
          <h1 className={c.title}>Baci oko na mail!</h1>
          <Link to={RouteNames.LOGIN}>
            <img src={closeIcon} alt='Close login' className={c.closeIcon} />
          </Link>
        </div>
        <div className={c.textContainer}>
          <p className={c.text}>
            Poslan ti je link za resetiranje lozinke na mail: <b>{email}</b>.
            <br />
            <br />
            Prati upute i u par klikova ponovno si u igri.
          </p>
        </div>
        <div className={c.buttonContainer}>
          <Button
            children={
              timeLeft > 0
                ? `Pošalji ponovno (${timeLeft} s)`
                : 'Pošalji ponovno'
            }
            variant='orange'
            onClick={handleSendEmail}
            disabled={timeLeft > 0}
          />
        </div>
      </div>
    </>
  );
};

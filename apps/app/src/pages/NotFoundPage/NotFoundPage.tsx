import Button from '@/components/Button';
import c from './NotFoundPage.module.scss';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={c.page}>
      <h1 className={c.title}>404</h1>
      <p className={c.subtitle}>Ups! Ova stranica ne postoji.</p>
      <Button variant='black' onClick={() => navigate(-1)}>
        Povratak
      </Button>
    </div>
  );
};

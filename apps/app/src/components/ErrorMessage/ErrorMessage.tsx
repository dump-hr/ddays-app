import styles from './ErrorMessage.module.scss';
import ArrowLeft from '@/assets/icons/arrow-left-white.svg';
import { useNavigate } from 'react-router-dom';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const navigate = useNavigate();
  return (
    <div className={styles.errorMessageContainer}>
      <p className={styles.errorMessage}>{message}</p>
      <img
        src={ArrowLeft}
        className={styles.navigateBackIcon}
        onClick={() => navigate(-1)}
      />
    </div>
  );
};

export default ErrorMessage;

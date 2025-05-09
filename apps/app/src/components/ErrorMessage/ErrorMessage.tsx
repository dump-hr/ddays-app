import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className={styles.errorMessageContainer}>
      <p className={styles.errorMessage}>{message}</p>
    </div>
  );
};

export default ErrorMessage;

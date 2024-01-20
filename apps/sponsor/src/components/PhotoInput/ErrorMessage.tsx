import styles from './PhotoInput.module.scss';

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <p className={styles.errorMessage}>{message}</p>;
};

export default ErrorMessage;

import styles from './PhotoInput.module.scss';

type ErrorMessageProps = {
    display: boolean;
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({display, message}) => {
  return (
    <div>
        {display && <p className={styles.errorMessage}>{message}</p>}
    </div>
  );
};

export default ErrorMessage;

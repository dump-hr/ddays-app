import styles from './PhotoInput.module.scss';

type PhotoInputProps = {
  title?: string;
  content?: string;
};

const PhotoInputLabel: React.FC<PhotoInputProps> = ({ title, content }) => {
  return (
    <div className={styles.labelArea}>
      <h4 className={styles.labelAreaTitle}>{title}</h4>
      <div className={styles.labelAreaContent}>{content}</div>
    </div>
  );
};

export default PhotoInputLabel;

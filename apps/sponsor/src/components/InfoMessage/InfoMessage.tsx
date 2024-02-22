import InformationCircleIcon from '../../assets/icons/information-circle.svg';
import c from './InfoMessage.module.scss';

type InfoMessageProps = {
  message: string;
};

const InfoMessage = ({ message }: InfoMessageProps) => {
  return (
    <div className={c.infoMessage}>
      <img src={InformationCircleIcon} />
      <p>{message}</p>
    </div>
  );
};

export default InfoMessage;

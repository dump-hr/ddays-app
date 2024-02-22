import InformationCircleIcon from '../../assets/icons/information-circle.svg';
import c from './InfoMessage.module.scss';

type InfoMessageProps = {
  message: string;
} & React.HTMLAttributes<HTMLDivElement>;

const InfoMessage = ({ message, ...handlers }: InfoMessageProps) => {
  return (
    <div className={c.infoMessage} {...handlers}>
      <img src={InformationCircleIcon} />
      <p>{message}</p>
    </div>
  );
};

export default InfoMessage;

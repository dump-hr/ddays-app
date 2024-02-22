import c from './InfoMessage.module.scss';

type InfoMessageProps = {
  message: string;
};

const InfoMessage = ({ message }: InfoMessageProps) => {
  return <div className={c.infoMessage}>{message}</div>;
};

export default InfoMessage;

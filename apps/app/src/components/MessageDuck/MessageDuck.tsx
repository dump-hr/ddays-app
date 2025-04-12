import DuckEmptySign from '@/assets/images/duck-empty-sign.png';
import c from './MessageDuck.module.scss';

type MessageDuckProps = {
  text: string;
};

const MessageDuck: React.FC<MessageDuckProps> = ({ text }) => {
  return (
    <div className={c.messageDuck}>
      <img className={c.duck} src={DuckEmptySign} alt='Duck Empty Sign' />
      <p className={c.text}>{text}</p>
      <div className={c.progressRing}>
        <div className={c.progressRingInner} />
      </div>
    </div>
  );
};

export default MessageDuck;

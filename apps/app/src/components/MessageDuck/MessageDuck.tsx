import DuckEmptySign from '@/assets/images/duck-empty-sign.png';
import c from './MessageDuck.module.scss';

type MessageDuckProps = {
  text: string;
  progressPercent?: number;
};

const MessageDuck: React.FC<MessageDuckProps> = ({ text, progressPercent }) => {
  const outerRingStyle = {
    maskImage: `conic-gradient(
    from 0deg,
    #000 0%,
    #000 ${progressPercent}%,
    transparent ${progressPercent}%,
    transparent 100%
  )`,
  };
  return (
    <div className={c.messageDuck}>
      <img className={c.duck} src={DuckEmptySign} />
      <p className={c.text}>{text}</p>
      <div className={c.progressRing}>
        <div className={c.progressRingInner} style={outerRingStyle} />
      </div>
    </div>
  );
};

export default MessageDuck;

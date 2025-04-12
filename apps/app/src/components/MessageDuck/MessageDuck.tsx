import DuckEmptySign from '@/assets/images/duck-empty-sign.png';
import c from './MessageDuck.module.scss';

const MessageDuck = () => {
  return (
    <div className={c.messageDuck}>
      <img className={c.duck} src={DuckEmptySign} alt='Duck Empty Sign' />
      <div className={c.progressRing}>
        <div className={c.progressRingInner} />
      </div>
    </div>
  );
};

export default MessageDuck;

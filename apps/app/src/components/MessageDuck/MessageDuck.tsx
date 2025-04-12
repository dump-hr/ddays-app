import DuckEmptySign from '@/assets/images/duck-empty-sign.png';
import c from './MessageDuck.module.scss';

const MessageDuck = () => {
  return (
    <div className={c.messageDuck}>
      <img className={c.duck} src={DuckEmptySign} alt='Duck Empty Sign' />
    </div>
  );
};

export default MessageDuck;

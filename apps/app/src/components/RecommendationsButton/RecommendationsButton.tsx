import clsx from 'clsx';
import Arrow from '../../assets/icons/gray-arrow.svg';
import Duck from '../../assets/images/duck.png';
import c from './RecommendationsButton.module.scss';
import { useEffect, useRef, useState } from 'react';
import useRefDimensions from '../../hooks/useRefDimensions';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@/router/routes';

type RecommendationsButtonProps = React.HTMLAttributes<HTMLDivElement>;

const RecommendationsButton: React.FC<RecommendationsButtonProps> = ({
  className,
  ...handlers
}) => {
  const [isCompact, setIsCompact] = useState(false);
  const navigate = useNavigate();

  const buttonRef = useRef(null);
  const dimensions = useRefDimensions(buttonRef);

  useEffect(() => {
    if (dimensions.width < 400) {
      setIsCompact(true);
    } else {
      setIsCompact(false);
    }
  }, [dimensions]);

  return (
    <div
      className={clsx(c.button, className, { [c.compact]: isCompact })}
      onClick={() => navigate(RouteNames.PROFILE_RECOMMENDATIONS)}
      {...handlers}
      ref={buttonRef}>
      <p className={c.text}>
        Moglo bi ti se svidit još i...{' '}
        <img className={c.arrow} src={Arrow} alt='' />
      </p>
      <img className={c.duck} src={Duck} alt='' />
    </div>
  );
};

export default RecommendationsButton;

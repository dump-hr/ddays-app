import clsx from 'clsx';
import Arrow from '../../assets/icons/gray-arrow.svg';
import Duck from '../../assets/images/duck.png';
import c from './RecommendationsButton.module.scss';
import { useEffect, useRef, useState } from 'react';
import useRefDimensions from '../../hooks/useRefDimensions';

type RecommendationsButtonProps = React.HTMLAttributes<HTMLDivElement>;

const RecommendationsButton: React.FC<RecommendationsButtonProps> = ({
  className,
  ...handlers
}) => {
  const [isCompact, setIsCompact] = useState(false);

  const buttonRef = useRef(null);
  const dimensions = useRefDimensions(buttonRef);
  console.log(dimensions);

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
      {...handlers}
      ref={buttonRef}>
      <p className={c.text}>
        Preporuke samo za tebe
        <img className={c.arrow} src={Arrow} alt='' />
      </p>
      <img className={c.duck} src={Duck} alt='' />
    </div>
  );
};

export default RecommendationsButton;

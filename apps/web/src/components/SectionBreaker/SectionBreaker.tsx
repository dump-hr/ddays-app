import clsx from 'clsx';

import SectionBreakerDark from '../../assets/images/section-breaker-dark.png';
import SectionBreakerGreen from '../../assets/images/section-breaker-green.png';
import SectionBreakerLight from '../../assets/images/section-breaker-light.png';
import SectionBreakerOrange from '../../assets/images/section-breaker-orange.png';
import c from './SectionBreaker.module.scss';

type Variant = 'dark' | 'light' | 'orange' | 'green';

type SectionBreakerProps = {
  fg: Variant;
  bg: Variant | string;
  className?: string;
};

const sectionBreakerBackground = {
  dark: '#000000',
  light: '#f5ede1',
  orange: '#ff482f',
  green: '#065852',
};

const sectionBreakerImage = {
  dark: SectionBreakerDark,
  light: SectionBreakerLight,
  orange: SectionBreakerOrange,
  green: SectionBreakerGreen,
};

export const SectionBreaker: React.FC<SectionBreakerProps> = ({
  fg,
  bg,
  className,
}) => {
  return (
    <div
      className={clsx(c.container, className)}
      style={{
        backgroundColor:
          sectionBreakerBackground[
            bg as keyof typeof sectionBreakerBackground
          ] || bg,
      }}>
      <img className={c.sectionBreaker} src={sectionBreakerImage[fg]} alt='' />
    </div>
  );
};

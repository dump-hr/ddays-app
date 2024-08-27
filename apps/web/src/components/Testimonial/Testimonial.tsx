import clsx from 'clsx';

import QuotesIcon from '../../assets/icons/quotes.svg';
import c from './Testimonial.module.scss';

type Color = 'white' | 'black' | 'beige';

type TestimonialProps = {
  color: Color;
  name: string;
  title: string;
  company: string;
  text: string;
};

const Testimonial = ({
  color,
  name,
  title,
  company,
  text,
}: TestimonialProps) => {
  const classes = clsx({
    [c.testimonial]: true,
    [c.white]: color === 'white',
    [c.black]: color === 'black',
    [c.beige]: color === 'beige',
  });

  return (
    <div className={classes}>
      <div className={c.sectionBreaker} />
      <div className={c.leftWrapper}>
        <img src={QuotesIcon} className={c.quote} />
        <div className={c.infoWrapper}>
          <p className={c.name}>{name}</p>
          <p className={c.title}>{title}</p>
          <p className={c.company}>@ {company}</p>
        </div>
      </div>
      <div className={c.rightWrapper}>
        <p className={c.text}>{text}</p>
      </div>
    </div>
  );
};

export default Testimonial;

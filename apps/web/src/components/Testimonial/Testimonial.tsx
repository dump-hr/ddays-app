import clsx from 'clsx';

import QuotesIcon from '../../assets/icons/quotes.svg';
import c from './Testimonial.module.scss';

const color = {
  white: '#fff',
  black: '#171615',
  beige: '#FCF8EB',
};

type TestimonialProps = {
  color: keyof typeof color;
  name: string;
  position: string;
  text: string;
};

const Testimonial = ({ color, name, position, text }: TestimonialProps) => {
  const classes = clsx({
    [c.testimonial]: true,
    [c.white]: color === 'white',
    [c.black]: color === 'black',
    [c.beige]: color === 'beige',
  });

  return (
    <div className={classes}>
      <div className={c.leftWrapper}>
        <img src={QuotesIcon} className={c.quote} />
        <div className={c.infoWrapper}>
          <p className={c.name}>{name}</p>
          <p className={c.position}>{position}</p>
        </div>
      </div>
      <div className={c.rightWrapper}>
        <p className={c.text}>{text}</p>
      </div>
    </div>
  );
};

export default Testimonial;

import clsx from 'clsx';

import c from './Testimonial.module.scss';

const color = {
  white: '#fff',
  black: '#171615',
  beige: '#FCF8EB',
};

type TestimonialProps = {
  color: keyof typeof color;
};

const Testimonial = ({ color }: TestimonialProps) => {
  const classes = clsx({
    [c.testimonial]: true,
    [c.white]: color === 'white',
    [c.black]: color === 'black',
    [c.beige]: color === 'beige',
  });

  return <div className={classes}>Testimonial</div>;
};

export default Testimonial;

import classes from 'components/SponsorSection/SponsorSection.module.scss';

export const dotMaker = (count: number = 50) => {
  const dots = [];
  for (let i = 0; i < count; i++) {
    dots.push(<div className={classes.dot} key={i}></div>);
  }
  return dots;
};

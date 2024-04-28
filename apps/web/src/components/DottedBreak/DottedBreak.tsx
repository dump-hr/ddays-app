import clsx from 'clsx';

import c from './DottedBreak.module.scss';

type DottedBreakProps = {
  dotSize?: number;
  dotNumber?: number;
  vertical?: boolean;
  color: 'black' | 'white';
} & React.HTMLAttributes<HTMLDivElement>;

const DottedBreak = ({
  dotSize = 5,
  dotNumber = 30,
  vertical,
  color,
  ...handlers
}: DottedBreakProps) => {
  const Dots = () => {
    const dots = [];
    const style = {
      width: dotSize,
      height: dotSize,
      borderRadius: '50%',
    };

    for (let i = 0; i < dotNumber; i++) {
      dots.push(<div className={c.dot} key={i} style={style}></div>);
    }
    return dots;
  };

  const classes = clsx({
    [c.dots]: true,
    [c.vertical]: vertical,
    [c.black]: color === 'black',
    [c.white]: color === 'white',
  });

  return (
    <div className={classes} {...handlers}>
      <Dots />
    </div>
  );
};

export default DottedBreak;

import c from './DottedBreak.module.scss';

type DottedBreakProps = {
  dotSize?: number;
  dotNumber?: number;
} & React.HTMLAttributes<HTMLDivElement>;

const DottedBreak = ({
  dotSize = 5,
  dotNumber = 30,
  ...handlers
}: DottedBreakProps) => {
  const Dots = () => {
    const dots = [];
    const style = {
      width: dotSize,
      height: dotSize,
      background: 'white',
      borderRadius: '50%',
    };

    for (let i = 0; i < dotNumber; i++) {
      dots.push(<div className={c.dot} key={i} style={style}></div>);
    }
    return dots;
  };

  return (
    <div className={c.dots} {...handlers}>
      <Dots />
    </div>
  );
};

export default DottedBreak;
import c from './CircularButton.module.scss';

type CircularButtonProps = {
  children: React.ReactNode;
};

const CircularButton = ({ children }: CircularButtonProps) => {
  return <button className={c.circularButton}>{children}</button>;
};

export default CircularButton;

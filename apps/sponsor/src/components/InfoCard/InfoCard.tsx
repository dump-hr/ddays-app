import { Button } from '../Button';
import c from './InfoCard.module.scss';

type InfoCardProps = {
  children?: React.ReactNode;
  title: string;
  buttonText: string;
  onClick: () => void;
};

export const InfoCard = ({
  children,
  title,
  buttonText,
  onClick,
}: InfoCardProps) => {
  return (
    <div className={c.infoCard}>
      <h3>{title}</h3>
      <div className={c.content}>{children}</div>
      <Button className={c.button} onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  );
};

import c from './InfoCard.module.scss';

type InfoCardProps = {
  children?: React.ReactNode;
  title: string;
  buttonText: string;
  onClick: () => void;
};

const InfoCard = ({ children, title, buttonText, onClick }: InfoCardProps) => {
  return (
    <div className={c.infoCard}>
      <h3>{title}</h3>
      {children}
      <button onClick={onClick}>{buttonText}</button>
    </div>
  );
};

export default InfoCard;

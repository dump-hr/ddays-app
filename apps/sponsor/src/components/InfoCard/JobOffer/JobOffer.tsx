import ArrowRightSvg from '../../../assets/icons/arrow-right.svg';
import PinSvg from '../../../assets/icons/pin.svg';
import c from './JobOffer.module.scss';

type JobOfferProps = {
  title: string;
  description: string;
  location?: string;
  link?: string;
};

export const JobOffer: React.FC<JobOfferProps> = ({
  title,
  description,
  location,
  link,
}) => {
  return (
    <div className={c.jobOffer}>
      <header className={c.header}>
        <h3 className={c.title}>{title}</h3>
        {location && (
          <div className={c.location}>
            <img src={PinSvg} alt='Lokacija' className={c.icon} />
            <p className={c.text}>{location}</p>
          </div>
        )}
      </header>
      <p className={c.description}>{description}</p>
      {link !== '' && (
        <a className={c.learnMore} href={link}>
          Saznaj više
          <img src={ArrowRightSvg} alt='Strelica desno' />
        </a>
      )}
    </div>
  );
};

import ArrowRightSvg from '../../../assets/arrow-right.svg';
import PinSvg from '../../../assets/pin.svg';
import c from './JobOffer.module.scss';

type JobOfferProps = {
  title: string;
  description: string;
  location: string;
};

export const JobOffer = ({ title, description, location }: JobOfferProps) => {
  return (
    <div className={c.jobOffer}>
      <header className={c.header}>
        <h3 className={c.title}>{title}</h3>
        <div className={c.location}>
          <img src={PinSvg} alt='Lokacija' className={c.icon} />
          <p className={c.text}>{location}</p>
        </div>
      </header>
      <p className={c.description}>{description}</p>
      <a className={c.learnMore} href=''>
        Saznaj više
        <img src={ArrowRightSvg} alt='Strelica desno' />
      </a>
    </div>
  );
};

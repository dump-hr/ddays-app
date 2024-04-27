import logoSvg from '../../assets/images/logo.svg';
import classes from './BoothConfirmationPage.module.scss';

export interface BoothConfirmationPageProps {
  name: string;
}

export const BoothConfirmationPage = ({ name }: BoothConfirmationPageProps) => {
  return (
    <section className={classes.container}>
      <div className={classes.background}></div>
      <div className={classes.backgroundImg}></div>
      <svg className={classes.logoSvg} width={192} height={48}>
        <use href={`${logoSvg}#logo`} />
      </svg>
      <article className={classes.content}>
        <span className={classes.title}>Mjesto {name} je sada vaše!</span>
        <span className={classes.desc}>
          Ukoliko imate dodatnih pitanja ili zahtjeva vezanih za vaš prostor,
          stojimo na raspolaganju.
        </span>
        <button className={classes.button}>Uredi odabir</button>
      </article>
    </section>
  );
};

import { useClearBooth } from '../../api/booth/useClearBooth';
import logoSvg from '../../assets/images/logo.svg';
import classes from './BoothConfirmationPage.module.scss';

export interface BoothConfirmationPageProps {
  name: string;
}

export const BoothConfirmationPage = ({ name }: BoothConfirmationPageProps) => {
  const clearBooth = useClearBooth();

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
        <button
          className={classes.button}
          onClick={() => clearBooth.mutateAsync()}>
          Uredi odabir
        </button>
      </article>
    </section>
  );
};

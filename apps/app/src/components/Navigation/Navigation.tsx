import styles from './Navigation.module.scss';
import sprite from '../../assets/sprite.svg';

export const Navigation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <svg height='24' width='24'>
          <use href={`${sprite}#home-icon`} />
        </svg>
      </div>
      <div className={styles.iconWrapper}>
        <svg height='24' width='25'>
          <use href={`${sprite}#schedule-icon`} />
        </svg>
      </div>
      <div className={styles.iconWrapper}>
        <svg width='22' height='24'>
          <use href={`${sprite}#fly-talks-icon`} />
        </svg>
      </div>
      <div className={styles.iconWrapper}>
        <svg width='23' height='24'>
          <use href={`${sprite}#companies-icon`} />
        </svg>
      </div>
      <div className={styles.iconWrapper}>
        <svg width='22' height='22'>
          <use href={`${sprite}#profile-icon`} />
        </svg>
      </div>
    </div>
  );
};

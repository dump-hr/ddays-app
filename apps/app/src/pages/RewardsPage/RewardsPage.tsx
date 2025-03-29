import c from './RewardsPage.module.scss';
import ReturnIcon from '@/assets/icons/arrow-left-white.svg';
import { Reward } from '@/components/Reward';

export const RewardsPage = () => {
  return (
    <div className={c.page}>
      <img src={ReturnIcon} alt='return icon' />
      <main className={c.main}>
        <h2>Nagrade</h2>
        <p>
          Osvoji negrade hihi Osvoji negrade hihiOsvoji negrade hihiOsvoji
          negrade hihiOsvoji negrade hihiOsvoji negrade hihiOsvoji negrade
          hihiOsvoji negrade hihiOsvoji negrade hihiOsvoji negrade hihiOsvoji
          negrade hihiOsvoji negrade hihiOsvoji negrade hihiOsvoji negrade hihi
        </p>

        <section className={c.rewardsSection}>
          <Reward />
          <Reward />
          <Reward />
          <Reward />
        </section>
      </main>
    </div>
  );
};

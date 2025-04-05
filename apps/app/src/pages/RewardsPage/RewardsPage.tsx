import c from './RewardsPage.module.scss';
import ReturnIcon from '@/assets/icons/arrow-left-white.svg';
import CloseIcon from '@/assets/icons/close-icon.svg';
import { Reward } from '@/components/Reward';
import { useDeviceType } from '@/hooks/UseDeviceType';
import { useNavigate } from 'react-router-dom';
import { rewards } from './RewardsSeed';

export const RewardsPage = () => {
  const { isMobile } = useDeviceType({});
  const navigate = useNavigate();

  return (
    <div className={c.page}>
      {!isMobile && (
        <img
          src={ReturnIcon}
          alt='return icon'
          onClick={() => navigate('/app/profile')}
        />
      )}

      <main className={c.main}>
        {isMobile ? (
          <header>
            <h2>Nagrade</h2>
            <img
              src={CloseIcon}
              alt='close icon'
              onClick={() => navigate('/app/profile')}
            />
          </header>
        ) : (
          <h2>Nagrade</h2>
        )}
        <p>
          Osvoji negrade hihi Osvoji negrade hihiOsvoji negrade hihiOsvoji
          negrade hihiOsvoji negrade hihiOsvoji negrade hihiOsvoji negrade
          hihiOsvoji negrade hihiOsvoji negrade hihiOsvoji negrade hihiOsvoji
          negrade hihiOsvoji negrade hihiOsvoji negrade hihiOsvoji negrade hihi
        </p>

        <section className={c.rewardsSection}>
          {rewards.map((reward) => {
            return <Reward name={reward.name} image={reward.image} />;
          })}
        </section>
      </main>
    </div>
  );
};

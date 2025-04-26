import c from './RewardsPage.module.scss';
import ReturnIcon from '@/assets/icons/arrow-left-white.svg';
import CloseIcon from '@/assets/icons/close-icon.svg';
import { Reward } from '@/components/Reward';
import { useDeviceType } from '@/hooks/UseDeviceType';
import { useNavigate } from 'react-router-dom';
import { useGetAllRewards } from '@/api/reward/useGetAllRewards';
import { RewardDto } from '@ddays-app/types/src/dto/reward';

export const RewardsPage = () => {
  const { isMobile } = useDeviceType({});
  const navigate = useNavigate();

  const { data: rewards = [] as RewardDto[] } = useGetAllRewards();

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
          Ove nagrade dijelimo na zatvaranju konferencije. Zato se potrudi da
          skupiš i sačuvaš što više bodova!
        </p>

        <section className={c.rewardsSection}>
          {rewards.map((reward) => {
            return (
              <Reward
                key={reward.id}
                name={reward.name}
                image={reward.imageUrl}
              />
            );
          })}
        </section>
      </main>
    </div>
  );
};

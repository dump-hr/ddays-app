import { useNavigate } from 'react-router-dom';
import c from './ProfileLeaderboardPage.module.scss';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import FirstPlaceDuck from '../../assets/images/first-place.png';
import SecondPlaceDuck from '../../assets/images/second-place.png';
import ThirdPlaceDuck from '../../assets/images/third-place.png';
import star from '../../assets/icons/star-red.svg';

export const ProfileLeaderboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className={c.page}>
      <header className={c.header}></header>
      <main className={c.main}>
        <header className={c.mainHeader}>
          <img
            src={ArrowLeft}
            alt=''
            className={c.arrowLeft}
            onClick={() => navigate(-1)}
          />
          <h3 className={c.title}>Leaderbord</h3>
        </header>
        <div className={c.flexWrapper}>
          <div className={c.duckContainer}>
            <div className={c.duckWrapper}>
              <img
                src={SecondPlaceDuck}
                alt='Drugo mjesto'
                className={`${c.duck} ${c.secondPlace}`}
              />
              <div className={c.duckInfo}>
                <div className={c.duckPointsWrapper}>
                  <span className={c.duckPoints}>6875</span>
                  <img src={star} className={c.star} />
                </div>
                <span className={c.duckName}>Magdalena</span>
              </div>
            </div>

            <div className={c.duckWrapper}>
              <img
                src={FirstPlaceDuck}
                alt='Prvo mjesto'
                className={`${c.duck} ${c.firstPlace}`}
              />
              <div className={c.duckInfo}>
                <div className={c.duckPointsWrapper}>
                  <span className={c.duckPoints}>7343</span>
                  <img src={star} className={c.star} />
                </div>
                <span className={c.duckName}>Aleksandra</span>
              </div>
            </div>

            <div className={c.duckWrapper}>
              <img
                src={ThirdPlaceDuck}
                alt='Treće mjesto'
                className={`${c.duck} ${c.thirdPlace}`}
              />
              <div className={c.duckInfo}>
                <div className={c.duckPointsWrapper}>
                  <span className={c.duckPoints}>6655</span>
                  <img src={star} className={c.star} />
                </div>
                <span className={c.duckName}>Mihaela</span>
              </div>
            </div>
          </div>

          <div className={c.leaderboardWrapper}>
            {/* TODO: Implementirat poredak */}
          </div>
        </div>
      </main>
    </div>
  );
};

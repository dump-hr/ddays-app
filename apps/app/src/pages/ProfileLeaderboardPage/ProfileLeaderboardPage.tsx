import { useNavigate } from 'react-router-dom';
import c from './ProfileLeaderboardPage.module.scss';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import FirstPlaceDuck from '../../assets/images/first-place.png';
import SecondPlaceDuck from '../../assets/images/second-place.png';
import ThirdPlaceDuck from '../../assets/images/third-place.png';
import star from '../../assets/icons/star-red.svg';
import LeaderboardTableRow from '@/components/LeaderboardTableRow';

export const ProfileLeaderboardPage = () => {
  const leaderboardData = [
    { id: 1, rank: 112, name: 'Marija', level: 2, points: 35 },
    { id: 2, rank: 4, name: 'Omar', level: 2, points: 145 },
    { id: 3, rank: 5, name: 'Omar', level: 2, points: 145 },
  ];
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
            <div className={c.leaderboardWrapper}>
              <table className={c.leaderboardTable}>
                <tbody>
                  {leaderboardData.map((entry) => (
                    <LeaderboardTableRow
                      key={entry.id}
                      rank={entry.rank}
                      name={entry.name}
                      level={entry.level}
                      points={entry.points}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

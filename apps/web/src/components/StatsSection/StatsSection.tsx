import { StatCard } from 'components/StatCard';

import statPredavanja from 'assets/images/stat-predavanja.jpg';
import statRadionica from 'assets/images/stat-radionica.jpg';
import statPanela from 'assets/images/stat-panela.jpg';
import statCampfire from 'assets/images/stat-campfire.jpg';
import statFlytalks from 'assets/images/stat-flytalks.jpg';

import c from './StatsSection.module.scss';

const stats = [
  { image: statPredavanja, number: 16, text: 'Predavanja' },
  null,
  { image: statRadionica, number: 6, text: 'Radionica' },
  { image: statPanela, number: 2, text: 'Panela' },
  { image: statCampfire, number: 7, text: 'Campfire Talks' },
  { image: statFlytalks, number: 20, text: 'Flytalks' },
];

export const StatsSection = () => {
  return (
    <section className={c.statsSection}>
      <div className={c.grid}>
        {stats.map((stat, i) =>
          stat === null ? (
            <div key={i} className={c.titleCard}>
              <span className={c.titleText}>
                Šta ima na Daysima?
              </span>
            </div>
          ) : (
            <StatCard
              key={i}
              image={stat.image}
              number={stat.number}
              text={stat.text}
            />
          )
        )}
      </div>
    </section>
  );
};

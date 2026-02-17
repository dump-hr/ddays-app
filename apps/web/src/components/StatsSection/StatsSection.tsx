import { StatCard } from 'components/StatCard';
import sampleImage from 'assets/images/stat-card-sample.png';

import c from './StatsSection.module.scss';

const stats = [
  { image: sampleImage, number: 16, text: 'Predavanja' },
  { image: sampleImage, number: 8, text: 'Radionica' },
  { image: sampleImage, number: 2, text: 'Dana' },
  { image: sampleImage, number: 1000, text: 'Sudionika' },
  { image: sampleImage, number: 50, text: 'Sponzora' },
  { image: sampleImage, number: 30, text: 'Speakera' },
];

export const StatsSection = () => {
  return (
    <section className={c.statsSection}>
      <div className={c.grid}>
        {stats.map((stat, i) => (
          <StatCard
            key={i}
            image={stat.image}
            number={stat.number}
            text={stat.text}
          />
        ))}
      </div>
    </section>
  );
};

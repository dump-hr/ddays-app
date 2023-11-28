import { useId } from 'react';
import { useFetchAchievements } from '../../api/useFetchAchievements';

const AchievementsPage = () => {
  const { data: achievements, isLoading } = useFetchAchievements();
  const id = useId();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(achievements);

  return (
    <div>
      {achievements?.map((achievement) => (
        <div key={id}>
          <h2>{achievement.name}</h2>
          <p>{achievement.description}</p>
          <span>{achievement.points} pts</span>
        </div>
      ))}
    </div>
  );
};

export default AchievementsPage;

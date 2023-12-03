import { useFetchAchievements } from '../../api/useFetchAchievements';

const AchievementsPage = () => {
  const { data: achievements, isLoading } = useFetchAchievements();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {achievements?.map((achievement, i) => (
        <div key={i}>
          <h2>{achievement.name}</h2>
          <p>{achievement.description}</p>
          <span>{achievement.points} pts</span>
        </div>
      ))}
    </div>
  );
};

export default AchievementsPage;

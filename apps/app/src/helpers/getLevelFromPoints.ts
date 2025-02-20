const levelPoints: Record<number, number> = {
  0: 1,
  200: 2,
  600: 3,
  1200: 4,
  1900: 5,
};

export function getLevelFromPoints(points: number): {
  level: number;
  exceeded: number;
} {
  const thresholds = Object.keys(levelPoints)
    .map(Number)
    .sort((a, b) => a - b);

  let level = 1;
  let currentThreshold = 0;

  for (const threshold of thresholds) {
    if (points >= threshold) {
      level = levelPoints[threshold];
      currentThreshold = threshold;
    } else {
      break;
    }
  }

  return {
    level,
    exceeded: points - currentThreshold,
  };
}

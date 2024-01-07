export const areArraysOverlapping = <T>(first: T[], second: T[]) => {
  return first.some((f) => second.includes(f));
};

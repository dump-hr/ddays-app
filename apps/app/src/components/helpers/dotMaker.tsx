export const dotMaker = (count: number = 50) => {
  return '.'.repeat(count).split(' ').join(' .') + ' .';
};

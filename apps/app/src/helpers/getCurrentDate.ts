export const getCurrentDate = (nowDate: Date) => {
  return (
    formatNumber(nowDate.getMonth() + 1) +
    '.' +
    formatNumber(nowDate.getDate()) +
    '.' +
    nowDate.getFullYear() +
    '.'
  );
};

const formatNumber = (number: number) => {
  if (number < 10) return '0' + number;
  return number;
};

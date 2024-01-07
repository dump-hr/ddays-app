export const toggleArrayElement = <T>(array: T[], value: T) => {
  const isPresent = array.indexOf(value) != -1;

  return isPresent ? array.filter((item) => item !== value) : [...array, value];
};

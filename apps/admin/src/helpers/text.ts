export const unCamelCase = (text: string) => {
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};
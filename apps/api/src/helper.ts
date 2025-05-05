export class Helper {
  static formatISO8601DateTime = (date: Date): string => {
    // Convert input to a Date object if it's a string
    if (typeof date === 'string') {
      date = new Date(date);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date string');
      }
    }

    // Format the date to ISO 8601 string
    const isoString = date.toISOString();
    return isoString;
  };
}

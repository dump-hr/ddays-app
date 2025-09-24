export class Helper {
  static formatExpirationDate = (
    expirationDate: Date | string | undefined,
  ): string => {
    if (!expirationDate) return '';

    const dateObj =
      typeof expirationDate === 'string'
        ? new Date(expirationDate)
        : expirationDate;

    if (isNaN(dateObj.getTime())) {
      console.error('Invalid Date:', expirationDate);
      return '';
    }

    const localYear = dateObj.getFullYear();
    const localMonth = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const localDay = dateObj.getDate().toString().padStart(2, '0');
    const localHour = dateObj.getHours().toString().padStart(2, '0');
    const localMinute = dateObj.getMinutes().toString().padStart(2, '0');

    return `${localYear}-${localMonth}-${localDay}T${localHour}:${localMinute}`;
  };
}

class TimeHelper {
  static changeDateIsoFormat(iso8601: string) {
    return iso8601.substring(0, 16);
  }

  static formatDate(date: string) {
    const dateObj = new Date(date);

    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();

    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();

    return `${day}.${month}.${year}. u ${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  static daylightSavingIsObserved(date: string) {
    const dateObj = new Date(date);
    const january = new Date(dateObj.getFullYear(), 0, 1).getTimezoneOffset();
    const july = new Date(dateObj.getFullYear(), 6, 1).getTimezoneOffset();

    return Math.max(january, july) !== dateObj.getTimezoneOffset();
  }

  static addHours(date: string) {
    const DST = this.daylightSavingIsObserved(date);
    const diff = (DST ? 2 : 1) * 2;

    const dateObj = new Date(date);
    dateObj.setHours(dateObj.getHours() + diff);

    return dateObj.toISOString();
  }

  static subtractHours(date: string) {
    const DST = this.daylightSavingIsObserved(date);
    const diff = DST ? 2 : 1;

    const dateObj = new Date(date);
    dateObj.setHours(dateObj.getHours() - diff);

    return dateObj.toISOString();
  }
}

export default TimeHelper;
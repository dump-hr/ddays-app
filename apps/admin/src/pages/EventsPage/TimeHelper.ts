class TimeHelper {
  static changeDateIsoFormat(iso8601: string) {
    return iso8601.substring(0, 16);
  }

  static formatDate(date: string) {
    const dateObj = new Date(date);

    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    return `${day}.${month}.${year}. u ${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  static daylightSavingIsObserved1(date: string) {
    const dateObj = new Date(date);
    const january = new Date(dateObj.getFullYear(), 0, 1).getTimezoneOffset();
    const july = new Date(dateObj.getFullYear(), 6, 1).getTimezoneOffset();

    return Math.max(january, july) !== dateObj.getTimezoneOffset();
  }

  static daylightSavingIsObserved(date: string, year: number) {
    const dateObj = new Date(date);

    const startDst = new Date(Date.UTC(year, 2, 31)); // March 31
    const endDst = new Date(Date.UTC(year, 9, 27)); // October 27

    return dateObj >= startDst && dateObj < endDst;
  }

  static addHours(date: string) {
    const dateObj = new Date(date);

    const DST = this.daylightSavingIsObserved(date, dateObj.getFullYear());
    const diff = (DST ? 2 : 1) * 2;

    dateObj.setHours(dateObj.getHours() + diff);

    return dateObj.toISOString().slice(0, 16);
  }
}

export default TimeHelper;

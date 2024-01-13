import dayjs from 'dayjs';

class TimeHelper {
  static changeDateIsoFormat(iso8601: string) {
    return iso8601.substring(0, 16);
  }

  static formatDate(date: string) {
    const dateObj = new Date(date);
    return dayjs(dateObj).format('DD.MM.YYYY. u HH:mm');
  }

  static daylightSavingIsObserved(date: string, year: number) {
    const dateObj = new Date(date);

    const startDst = new Date(Date.UTC(year, 2, 31)); // March 31
    const endDst = new Date(Date.UTC(year, 9, 27)); // October 27

    return dateObj >= startDst && dateObj < endDst;
  }

  // Remove when time is fixed
  static addHours(date: string | null) {
    if (!date) return null;

    const dateObj = new Date(date);
    console.log(dateObj);

    const DST = this.daylightSavingIsObserved(date, dateObj.getFullYear());
    const diff = (DST ? 2 : 1) * 2;

    dateObj.setHours(dateObj.getHours() + diff);

    return dateObj.toISOString().slice(0, 16);
  }
}

export default TimeHelper;

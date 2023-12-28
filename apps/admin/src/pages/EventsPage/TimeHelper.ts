class TimeHelper {
  static changeDateIsoFormat(iso8601: string) {
    const date = new Date(iso8601);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const simplifiedIso = `${year}-${month}-${day}T${hours}:${minutes}`;
    return simplifiedIso;
  }

  static addHour(date: string, hours: number = 1) {
    const dateObj = new Date(date);
    dateObj.setHours(dateObj.getHours() + hours);
    return dateObj.toISOString();
  }

  static formatDate(date: string) {
    const dateObj = new Date(date);

    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();

    const hours = (dateObj.getUTCHours() + 1) % 24;
    const minutes = dateObj.getUTCMinutes();

    return `${day}.${month}.${year}. u ${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}

export default TimeHelper;

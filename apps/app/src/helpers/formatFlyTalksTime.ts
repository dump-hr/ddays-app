export const formatTime = (dateString: string) => {
    const date = new Date(dateString.replace(' ', 'T'));
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
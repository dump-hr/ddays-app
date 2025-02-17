export const getPassedTime = (time: Date | undefined) => {
  if (!time) return '';

  const now = new Date();
  const diff = now.getTime() - time.getTime();
  const diffInMinutes = Math.floor(diff / 1000 / 60);

  if (diffInMinutes < 1) {
    return 'sada';
  }

  if (diffInMinutes < 60) {
    if (diffInMinutes % 10 === 1 && diffInMinutes !== 11) {
      return `Prije ${diffInMinutes} minutu`;
    }

    if (
      diffInMinutes % 10 < 5 &&
      diffInMinutes % 10 !== 0 &&
      (diffInMinutes < 10 || diffInMinutes > 20)
    ) {
      return `Prije ${diffInMinutes} minute`;
    }

    return `Prije ${diffInMinutes} minuta`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    if (diffInHours % 10 === 1 && diffInHours !== 11) {
      return `Prije ${diffInHours} sat`;
    }

    if (diffInHours % 10 < 5 && (diffInHours < 10 || diffInHours > 20)) {
      return `Prije ${diffInHours} sata`;
    }

    return `Prije ${diffInHours} sati`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays % 10 === 1 && diffInDays !== 11) {
    return `Prije ${diffInDays} dan`;
  }

  return `Prije ${diffInDays} dana`;
};

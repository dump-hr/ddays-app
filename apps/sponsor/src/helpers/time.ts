export function calculateTimeLeft(targetTime: Date): Date {
  const now = new Date();

  const croatiaTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'Europe/Zagreb' }),
  );
  const timeDifference = targetTime.getTime() - croatiaTime.getTime();

  if (timeDifference <= 0) return new Date(0);

  return new Date(timeDifference);
}

export function formatTimeLeft(timeLeft: Date): string {
  const days = Math.floor(timeLeft.getTime() / (1000 * 60 * 60 * 24));
  const hours = timeLeft.getUTCHours();
  const minutes = timeLeft.getUTCMinutes();
  const seconds = timeLeft.getUTCSeconds();

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

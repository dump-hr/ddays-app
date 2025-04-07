export function calculateTimeLeft(targetTime: Date): Date {
  const now = new Date();

  const croatiaTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'Europe/Zagreb' }),
  );
  const timeDifference = targetTime.getTime() - croatiaTime.getTime();

  if (timeDifference <= 0) return new Date(0);

  return new Date(timeDifference);
}

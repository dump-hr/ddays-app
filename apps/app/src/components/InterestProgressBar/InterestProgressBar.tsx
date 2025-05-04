import c from './InterestProgressBar.module.scss';

type InterestProgressBarProps = {
  label: string;
  percentage: number;
};

export const InterestProgressBar = ({
  label,
  percentage,
}: InterestProgressBarProps) => {
  return (
    <div className={c.interestsProgressBarContainer}>
      <div className={c.info}>
        <span className={c.label}>{label}</span>
        <span className={c.percentage}>{percentage}%</span>
      </div>

      <div className={c.progressTrack}>
        <div
          className={c.progressFill}
          style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

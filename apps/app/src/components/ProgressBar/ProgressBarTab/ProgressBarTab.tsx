import c from './ProgressBarTab.module.scss';

export const ProgressBarTab = ({
  stepIndex,
  active,
  onClick,
}: {
  stepIndex: number;
  active: boolean;
  onClick: (stepIndex: number) => void;
}) => {
  return (
    <div
      className={`${c.progressBarTab} ${active ? c.activeProgressBarTab : ''}`}
      onClick={() => onClick(stepIndex)}>
      {stepIndex}
    </div>
  );
};

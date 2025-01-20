import c from './ProgressBarTab.module.scss';

export const ProgressBarTab = ({
  stepIndex,
  active,
}: {
  stepIndex: number;
  active: boolean;
}) => {
  return (
    <div
      className={`${c.progressBarTab} ${active ? c.activeProgressBarTab : ''}`}>
      {stepIndex}
    </div>
  );
};

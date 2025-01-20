import c from './ProgressBar.module.scss';
import { ProgressBarTab } from './ProgressBarTab';
export const ProgressBar = () => {
  return (
    <div className={c.progressBar}>
      <ProgressBarTab stepIndex={1} active={true} />
      <div className={c.dots}></div>

      <ProgressBarTab stepIndex={2} active={false} />
      <div className={c.dots}></div>

      <ProgressBarTab stepIndex={3} active={false} />
      <div className={c.dots}></div>

      <ProgressBarTab stepIndex={4} active={false} />
    </div>
  );
};

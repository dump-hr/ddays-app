import { useState } from 'react';
import c from './ProgressBar.module.scss';
import { ProgressBarTab } from './ProgressBarTab';
export const ProgressBar = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const isAllowedForNextStep = () => {
    return true;
  };

  const handleStepClick = (clickedStep: number) => {
    const isGoingForward = clickedStep <= currentStep;
    const isGoingBackwards = clickedStep === currentStep + 1;

    if (isGoingBackwards) {
      setCurrentStep(clickedStep);
    } else if (isGoingForward && isAllowedForNextStep()) {
      setCurrentStep(clickedStep);
    }
  };
  return (
    <div className={c.progressBar}>
      {[1, 2, 3, 4].map((step) => (
        <>
          <ProgressBarTab
            key={step}
            stepIndex={step}
            active={step === currentStep}
            onClick={handleStepClick}
          />
          {step < 4 && <div className={c.dots}></div>}
        </>
      ))}
    </div>
  );
};

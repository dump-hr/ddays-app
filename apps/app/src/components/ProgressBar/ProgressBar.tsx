import { useRegistration } from '../../providers/RegistrationContext';
import c from './ProgressBar.module.scss';
import { ProgressBarTab } from './ProgressBarTab';
import React from 'react';

type ProgressBarProps = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  handleRegistrationClick: () => void;
};

export const ProgressBar = ({
  currentStep,
  setCurrentStep,
  handleRegistrationClick,
}: ProgressBarProps) => {
  const { isStepValid } = useRegistration();

  const handleStepClick = (clickedStep: number) => {
    const isGoingBackwards = clickedStep <= currentStep;
    const isGoingForward = clickedStep === currentStep + 1;

    const canChangeStep =
      isGoingBackwards || (isGoingForward && isStepValid(currentStep));

    if (isGoingForward) {
      handleRegistrationClick();
    }

    if (canChangeStep) {
      setCurrentStep(clickedStep);
    }
  };
  return (
    <div className={c.progressBar}>
      {[1, 2, 3, 4].map((step) => (
        <React.Fragment key={step}>
          <ProgressBarTab
            key={step}
            stepIndex={step}
            active={step <= currentStep}
            onClick={handleStepClick}
          />
          {step < 4 && <div className={c.dots}></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

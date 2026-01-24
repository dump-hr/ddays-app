import { createContext, useState, useContext, ReactNode } from 'react';
import { RegistrationFormErrors } from '../types/errors/errors.dto';

type RegistrationContextType = {
  errors: Record<number, RegistrationFormErrors>;
  setStepErrors: (
    step: number,
    newErrors: Partial<RegistrationFormErrors>,
  ) => void;
  clearStepErrors: (step: number) => void;
  isStepValid: (step: number) => boolean;
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(
  undefined,
);

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<Record<number, RegistrationFormErrors>>(
    {},
  );

  const setStepErrors = (
    step: number,
    newErrors: Partial<RegistrationFormErrors>,
  ) => {
    setErrors((prev) => ({
      ...prev,
      [step]: {
        ...(prev[step] || {}),
        ...newErrors,
      },
    }));
  };

  const clearStepErrors = (step: number) => {
    setErrors((prev) => {
      const updatedErrors = { ...prev };
      delete updatedErrors[step];
      return updatedErrors;
    });
  };

  const isStepValid = (step: number) => {
    const stepErrors = errors[step] || {};
    if (!stepErrors || !errors[step]) return false;
    return Object.values(stepErrors).every(
      (error) => error === '' || error === undefined,
    );
  };

  const value = {
    errors,
    setStepErrors,
    clearStepErrors,
    isStepValid,
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error(
      'useRegistration must be used within a RegistrationProvider',
    );
  }
  return context;
};

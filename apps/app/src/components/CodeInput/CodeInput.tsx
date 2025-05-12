import { useEffect, useRef } from 'react';
import c from './CodeInput.module.scss';
import clsx from 'clsx';

type CodeInputProps = {
  code: string[];
  isError?: boolean;
  className?: string;
  setCode: (code: string[]) => void;
  removeError: () => void;
  shouldFocus?: boolean;
};

const CodeInput: React.FC<CodeInputProps> = ({
  code,
  setCode,
  isError,
  removeError,
  className,
  shouldFocus,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function editChar(index: number, value: string) {
    const newCode = [...code];
    newCode[index] = value;
    const uppercase = newCode.map((char) => char.toUpperCase());
    setCode(uppercase);
  }

  function focusInput(index: number) {
    const input = inputRefs.current[index];

    if (input) {
      input.focus();
    }
  }

  function unfocusInputs() {
    inputRefs.current.forEach((input) => {
      if (input) {
        input.blur();
      }
    });
  }

  useEffect(() => {
    if (shouldFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [shouldFocus]);

  function handleOnChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    removeError();
    const { value } = e.target;
    editChar(index, value);

    if (index === code.length - 1 && value !== '') {
      unfocusInputs();
    }

    if (index !== code.length - 1 && value !== '') {
      focusInput(index + 1);
    }
    if (index > 0 && value === '') {
      focusInput(index - 1);
    }
  }

  return (
    <div className={clsx(c.codeInput, className)}>
      {Object.keys(code).map((_, i) => (
        <input
          key={i}
          type='text'
          maxLength={1}
          value={code[i]}
          className={clsx(c.input, {
            [c.filled]: code[i] !== '',
            [c.isError]: isError,
          })}
          ref={(el) => (inputRefs.current[i] = el)}
          onChange={(e) => handleOnChange(e, i)}
          onFocus={removeError}
        />
      ))}
    </div>
  );
};

export default CodeInput;

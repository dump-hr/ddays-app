import { useRef, useState } from 'react';
import c from './CodeInput.module.scss';
import clsx from 'clsx';

const CodeInput = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function editChar(index: number, value: string) {
    const newCode = [...code];
    newCode[index] = value;
    if (value !== '') {
      if (index < 5) {
        focusInput(index + 1);
      } else {
        focusInput(5);
      }
    }
    if (value === '') {
      if (index > 0) {
        focusInput(index - 1);
      } else {
        focusInput(0);
      }
    }

    setCode(newCode);
  }

  function focusInput(index: number) {
    if (inputRefs.current[index]) {
      inputRefs.current[index]?.focus();
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (e.key === 'Backspace' && code[index] === '') {
      if (index > 0) {
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        focusInput(index - 1);
      }
    }
  }

  return (
    <div className={c.codeInput}>
      {Object.keys(code).map((_, i) => (
        <input
          key={i}
          type='text'
          maxLength={1}
          value={code[i]}
          className={clsx(c.input, { [c.filled]: code[i] !== '' })}
          onChange={(e) => {
            const value = e.target.value;
            editChar(i, value);
          }}
          ref={(el) => (inputRefs.current[i] = el)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
};

export default CodeInput;

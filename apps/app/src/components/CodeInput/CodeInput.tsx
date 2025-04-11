import { useRef, useState } from 'react';
import c from './CodeInput.module.scss';
import clsx from 'clsx';

const CodeInput = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function editChar(index: number, value: string) {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
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

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    switch (e.key) {
      case 'Backspace':
        if (code[index] !== '') editChar(index, '');
        if (index > 0) {
          focusInput(index - 1);
        }
        break;
      case 'ArrowLeft':
        if (index > 0) {
          focusInput(index - 1);
        }
        break;
      case 'ArrowRight':
        if (index < code.length - 1) {
          focusInput(index + 1);
        }
        break;
      default:
        if (e.key.length > 1) {
          return;
        }

        if (index < code.length - 1) {
          focusInput(index + 1);
        }

        if (index === code.length - 1) {
          unfocusInputs();
        }

        editChar(index, e.key);

        break;
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
          ref={(el) => (inputRefs.current[i] = el)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
};

export default CodeInput;

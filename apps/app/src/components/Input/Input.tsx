import React, { useState } from 'react';
import c from './Input.module.scss';
import clsx from 'clsx';
import EyeIcon from '@/assets/icons/eye-open.svg';
import EyeClosedIcon from '@/assets/icons/eye-closed.svg';

type InputProps = {
  disabled?: boolean;
  value: string | undefined;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: 'text' | 'email' | 'password';
} & Omit<React.HTMLProps<HTMLInputElement>, 'onChange'>;

export const Input = ({
  disabled = false,
  value,
  placeholder,
  onChange,
  error,
  type = 'text',
  ...props
}: InputProps) => {
  const [isPasswordVisible, setPasswordToBeVisible] = useState(false);
  const [isFocused, setItIsFocus] = useState(false);

  const isActive = value && !error && !disabled && isFocused;
  const showLabel = isFocused || value;

  const passwordVisibility = () => {
    setPasswordToBeVisible((prev) => !prev);
  };

  const inputType =
    type === 'password' && !isPasswordVisible ? 'password' : 'text';

  return (
    <div className={c.container} style={props.style}>
      <div className={c.inputWrapper}>
        <input
          disabled={disabled}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setItIsFocus(true)}
          onBlur={() => setItIsFocus(false)}
          placeholder=''
          className={clsx(
            c.input,
            error && c.error,
            isActive && c.active,
            {
              [c.floating]: showLabel,
            },
            props.className,
          )}
          {...props}
        />

        <label
          className={clsx(c.placeholder, {
            [c.floating]: showLabel,
            [c.error]: error,
            [c.active]: isActive,
          })}>
          {placeholder}
        </label>

        {!isActive && !error && <div className={c.dots}></div>}

        {type === 'password' && (
          <button
            type='button'
            onClick={passwordVisibility}
            className={c.togglePassword}>
            <img src={isPasswordVisible ? EyeIcon : EyeClosedIcon} />
          </button>
        )}
      </div>

      {error && (
        <span className={clsx(c.errorText, { visible: !!error })}>{error}</span>
      )}
    </div>
  );
};

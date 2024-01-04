import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'wouter';

import { useLogin } from '../../api/useLogin';
import { Path } from '../../constants/paths';

const LoginForm = () => {
  const [, navigate] = useLocation();

  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  const login = useLogin(() => navigate(Path.Home, { replace: true }));

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValid(validateEmail(newEmail));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) {
      toast.error('Invalid email');
      return;
    }

    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };

    login.mutate({
      email: formElements.email.value,
      password: formElements.password.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        name='email'
        placeholder='Email'
        value={email}
        onChange={handleEmailChange}
      />
      <input type='password' name='password' placeholder='Password' />
      <button type='submit' disabled={!isValid}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;

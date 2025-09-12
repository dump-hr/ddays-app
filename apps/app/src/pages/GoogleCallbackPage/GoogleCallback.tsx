import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleAuthLogin } from '@/api/auth/useGoogleAuthLogin';
import toast from 'react-hot-toast';
import { RouteNames } from '@/router/routes';

export const GoogleCallback = () => {
  const navigate = useNavigate();
  const { mutate } = useGoogleAuthLogin();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const idToken = hashParams.get('id_token');

    if (idToken) {
      mutate(idToken);
    } else {
      toast.error('Google login failed!');
      navigate(RouteNames.LOGIN);
    }
  }, [mutate, navigate]);

  return <div>Loading...</div>;
};

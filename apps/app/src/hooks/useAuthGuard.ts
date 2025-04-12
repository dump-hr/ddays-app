import { isTokenExpired } from '@/helpers/auth';
import { RouteNames } from '@/router/routes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token || isTokenExpired(token)) {
      navigate(RouteNames.LOGIN, { replace: true });
    }
  }, [navigate]);
};

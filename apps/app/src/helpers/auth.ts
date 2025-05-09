import router from '@/router/Router';

export function isTokenExpired(token: string | undefined) {
  if (!token) return true;

  const expiry = JSON.parse(atob(token.split('.')[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
}

export function parseJwt(token: string) {
  if (!token) return;

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');

  return JSON.parse(window.atob(base64));
}

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userData');
  router.navigate('/app/login');
};
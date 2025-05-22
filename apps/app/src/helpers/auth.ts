import router from '@/router/Router';

function base64UrlDecode(base64Url: string) {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

export function isTokenExpired(token: string | undefined) {
  if (!token) return true;

  const payload = token.split('.')[1];
  if (!payload) return true;

  const decoded = base64UrlDecode(payload);
  const expiry = JSON.parse(decoded).exp;
  return Math.floor(Date.now() / 1000) >= expiry;
}

export function parseJwt(token: string) {
  if (!token) return;

  const base64Url = token.split('.')[1];
  if (!base64Url) return;

  const decoded = base64UrlDecode(base64Url);
  return JSON.parse(decoded);
}

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userData');
  router.navigate('/app/login');
};

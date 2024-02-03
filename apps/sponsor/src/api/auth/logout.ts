export const logout = () => {
  localStorage.removeItem('sponsorAccessToken');
  window.location.href = '/sponsor/login';
};

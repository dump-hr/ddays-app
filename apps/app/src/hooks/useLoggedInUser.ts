import { parseJwt } from '../helpers/auth';

export const useLoggedInUser = () => {
  const token = localStorage.getItem('accessToken');
  const user = token ? parseJwt(token) : null;
  const { email, firstName, lastName } = user || {};

  return {
    isLoggedIn: !!user,
    email: email || '',
    firstName: firstName || '',
    lastName: lastName || '',
  };
};

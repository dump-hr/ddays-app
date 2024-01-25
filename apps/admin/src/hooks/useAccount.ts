import { useMsal } from '@azure/msal-react';
import { Role } from '@ddays-app/types';

export const useAccount = () => {
  const { accounts, instance } = useMsal();
  const account = accounts[0];

  return {
    user: {
      email: account?.username,
      name: account?.name,
      roles: account?.idTokenClaims?.roles as Role[],
      sub: account?.idTokenClaims?.sub,
    },
    logout: instance.logout.bind(instance),
  };
};

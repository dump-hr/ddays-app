import { useMsal } from '@azure/msal-react';

export const useAccount = () => {
  const { accounts, instance } = useMsal();
  const account = accounts[0];

  return {
    user: {
      email: account?.username,
      name: account?.name,
      roles: account?.idTokenClaims?.roles,
      sub: account?.idTokenClaims?.sub,
    },
    logout: instance.logout.bind(instance),
  };
};

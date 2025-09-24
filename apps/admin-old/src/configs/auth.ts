export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
    authority: 'https://login.microsoftonline.com/organizations/',
    redirectUri: '/admin-old',
    postLogoutRedirectUri: '/admin-old',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

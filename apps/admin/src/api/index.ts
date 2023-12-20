import { PublicClientApplication } from '@azure/msal-browser';
import axios, { AxiosError } from 'axios';

import { msalConfig } from '../configs/authConfig';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const msalInstance = new PublicClientApplication(msalConfig);

const acquireToken = async () => {
  const silentRequest = {
    scopes: ['openid', 'profile'],
    account: msalInstance.getAllAccounts()[0],
  };
  try {
    const response = await msalInstance.acquireTokenSilent(silentRequest);
    return response.idToken;
  } catch (error) {
    await msalInstance.acquireTokenRedirect(silentRequest);
  }
};

api.interceptors.request.use(async (config) => {
  await msalInstance.initialize();

  const token = acquireToken();

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

type ErrorResponse = AxiosError & {
  response: {
    message: string;
  };
};

api.interceptors.response.use(
  (response) => response.data,
  async (error: ErrorResponse) => {
    if (error.response) {
      if (error.response?.status === 401) {
        const silentRequest = {
          scopes: ['openid', 'profile'],
          account: msalInstance.getAllAccounts()[0],
          forceRefresh: true,
        };

        await msalInstance.acquireTokenRedirect(silentRequest);
      }

      return Promise.reject(error.response.message);
    }

    return Promise.reject(error.message);
  },
);

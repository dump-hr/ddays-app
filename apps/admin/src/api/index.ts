import axios from 'axios';
import { msalInstance } from '../configs/msalInstance';
import toast from 'react-hot-toast';

import { AxiosError } from 'axios';
import { SilentRequest } from '@azure/msal-browser';

type ErrorResponse = AxiosError & {
  response: {
    data: {
      statusCode: number;
      message: string;
      error: string;
    };
  };
};

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getActiveAccount = async () => {
  let accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
    return accounts[0];
  }

  return new Promise((resolve, reject) => {
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += 100;
      if (elapsed > 10000) {
        clearInterval(interval);
        reject(new Error('Timed out waiting for MSAL account'));
        return;
      }
      accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
        clearInterval(interval);
        resolve(accounts[0]);
      }
    }, 100);
  });
};

const msal = msalInstance;

const acquireToken = async () => {
  const account = await getActiveAccount();

  const silentRequest = {
    scopes: ['openid', 'profile'],
    account,
  };

  try {
    const response = await msalInstance.acquireTokenSilent(
      silentRequest as SilentRequest,
    );
    return response.idToken;
  } catch (error) {
    console.error('Silent token failed', error);
    await msalInstance.acquireTokenRedirect(silentRequest as SilentRequest);
  }
};

api.interceptors.request.use(async (config) => {

  const token = await acquireToken();
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  async (error: ErrorResponse) => {
    if (error.response) {
      if (error.response?.status === 401) {
        const silentRequest = {
          scopes: ['openid', 'profile'],
          account: msal.getAllAccounts()[0],
          forceRefresh: true,
        };

        await msal.acquireTokenRedirect(silentRequest);
      } else if (error.response?.status === 403) {
        toast.error('Nisi admin');
      }

      return Promise.reject(error.response.data.message);
    }

    return Promise.reject(error.message);
  },
);

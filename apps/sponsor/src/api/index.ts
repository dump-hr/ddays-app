import axios, { AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

import { Path } from '../constants/paths';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('sponsorAccessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

type ErrorResponse = AxiosError & {
  response: AxiosResponse<{
    statusCode: number;
    message: string;
    error: string;
  }>;
};

api.interceptors.response.use(
  (response) => response.data,

  (error: ErrorResponse) => {
    if (error.response.status === 401) {
      history.pushState(null, '', Path.Login);
      toast.error(
        error.response.data.message || error.message || 'Forbidden access',
      );
    }
    return Promise.reject(error.response.data.message || error.message);
  },
);

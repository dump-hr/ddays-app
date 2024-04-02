import axios, { AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');

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
      // use navigate here instead of history.push!!!
      // history.pushState(null, '', Path.Login);
      toast.error(
        error.response.data.message || error.message || 'Forbidden access',
      );
    }
    return Promise.reject(error.response.data.message || error.message);
  },
);

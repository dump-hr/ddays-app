import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

type ErrorResponse = AxiosError & {
  response: {
    message: string;
  };
};

api.interceptors.response.use(
  (response) => response.data,
  (error: ErrorResponse) => {
    if (error.response) {
      return Promise.reject(error.response.message);
    }

    return Promise.reject(error.message);
  },
);

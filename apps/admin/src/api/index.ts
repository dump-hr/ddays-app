import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //TODO fix
  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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

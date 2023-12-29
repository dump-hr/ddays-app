import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

type ErrorResponse = AxiosError & {
  response: {
    data: {
      statusCode: number;
      message: string;
      error: string;
    };
  };
};

api.interceptors.response.use(
  (response) => response.data,
  (error: ErrorResponse) => {
    if (error.response.status) {
      return Promise.reject(error.response.data.message);
    }

    return Promise.reject(error.message);
  },
);

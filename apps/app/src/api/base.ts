import axios, { AxiosError, AxiosResponse } from 'axios';

const requestConfig = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance = axios.create(requestConfig);

axiosInstance.interceptors.request.use(async (config) => {
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

axiosInstance.interceptors.response.use(
  (response) => response.data,

  (error: ErrorResponse) => {
    return Promise.reject(error.response.data.message || error.message);
  },
);

export default axiosInstance;

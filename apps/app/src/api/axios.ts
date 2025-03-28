import axios from 'axios';

const requestConfig = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance = axios.create(requestConfig);

export default axiosInstance;

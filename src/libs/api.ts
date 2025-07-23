import axios from 'axios';
import config from '@/config/config';

const api = axios.create({
  baseURL: config.API_URL,
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;

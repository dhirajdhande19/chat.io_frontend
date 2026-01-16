import axios from 'axios';

export const baseURL = import.meta.env.VITE_BACKEND_URL;
export const socketBackendUrl = import.meta.env.VITE_SOCKET_URL;

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default api;

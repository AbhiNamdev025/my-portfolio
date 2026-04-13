import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

export const submitContactForm = async (payload) => {
  const { data } = await api.post('/contact', payload);
  return data;
};

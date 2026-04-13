import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_BASE_URL = rawBaseUrl.endsWith('/api') ? rawBaseUrl : `${rawBaseUrl.replace(/\/+$/, '')}/api`;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 45000
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const shouldRetry = (error) => {
  const code = error?.code || '';
  return code === 'ECONNABORTED' || code === 'ERR_NETWORK' || code === 'ERR_CANCELED';
};

export const warmUpServer = async () => {
  try {
    await api.get('/health', { timeout: 10000 });
  } catch {
    // Silent warm-up fail; submit handler still has retry.
  }
};

export const submitContactForm = async (payload) => {
  try {
    const { data } = await api.post('/contact', payload);
    return data;
  } catch (error) {
    if (!shouldRetry(error)) throw error;

    await wait(1200);
    const { data } = await api.post('/contact', payload);
    return data;
  }
};

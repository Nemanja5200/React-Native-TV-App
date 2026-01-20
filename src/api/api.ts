import axios from 'axios';
import {EXPO_PUBLIC_API_KEY, EXPO_PUBLIC_API_URL} from '@env';

const api = axios.create({
  baseURL: EXPO_PUBLIC_API_URL,
  params: {
    api_key: EXPO_PUBLIC_API_KEY,
  },
});

export default api;

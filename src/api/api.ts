import { EXPO_PUBLIC_API_KEY, EXPO_PUBLIC_API_URL } from '@env';
import axios from 'axios';

const api = axios.create({
    baseURL: EXPO_PUBLIC_API_URL,
    params: {
        api_key: EXPO_PUBLIC_API_KEY,
    },
});

export { api };

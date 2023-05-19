import wretch from 'wretch';

const API_URL = import.meta.env.VITE_APP_API_HOST;

export const api = wretch(API_URL);

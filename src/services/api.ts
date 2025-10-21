import axios from 'axios';

const VITE_API_BASE_URL = 'http://localhost:4001/api';

const api = axios.create({
  baseURL: VITE_API_BASE_URL,
});


export default api;

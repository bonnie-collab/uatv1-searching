import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bonnie.alwaysdata.net/api',
});

// Automatically inject your token into every outgoing API call
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // ⚠️ Check your Flask backend code: 
      // If your Python code splits 'Bearer ', use this format:
      config.headers['Authorization'] = `Bearer ${token}`;
      
      // If your Flask code reads raw tokens without 'Bearer ', change it to:
      // config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
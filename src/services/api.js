import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bonnie.alwaysdata.net/api',
});

// Interceptor to attach Authorization Bearer token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  login: (email, password) => API.post('/api/signin', { email, password }),
};

export const adminService = {
  getAnalytics: () => API.get('/api/admin/analytics'),
  getUsers: () => API.get('/api/admin/users'),
  updateUserRole: (id, role) => API.put(`/api/admin/users/${id}/role`, { role }),
  deleteUser: (id) => API.delete(`/api/admin/users/${id}`),
  getProducts: () => API.get('/api/admin/products'),
  getPayments: () => API.get('/api/mpesa_payment'), // Adjust endpoint fallback as needed
};

export default API;
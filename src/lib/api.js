import axios from 'axios';

// Configuration de base pour l'API
const API_BASE_URL = 'http://localhost:5000/api';

// Instance axios avec configuration par défaut
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Services d'authentification
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
};

// Services de parrainage
export const referralService = {
  create: (referralData) => api.post('/referrals/create', referralData),
  getMyReferrals: () => api.get('/referrals/my-referrals'),
  getStats: () => api.get('/referrals/stats'),
};

// Services d'administration
export const adminService = {
  getDashboard: () => api.get('/admin/dashboard'),
  getAllReferrals: (params) => api.get('/admin/referrals', { params }),
  validateReferral: (referralId, data) => api.post(`/admin/referrals/${referralId}/validate`, data),
  rejectReferral: (referralId, data) => api.post(`/admin/referrals/${referralId}/reject`, data),
};

// Services publics
export const publicService = {
  getInvitationDetails: (uniqueId) => api.get(`/public/invitation/${uniqueId}`),
  convertInvitation: (uniqueId) => api.post(`/public/invitation/${uniqueId}/convert`),
  sendContactMessage: (contactData) => api.post('/public/contact', contactData),
};

export default api;


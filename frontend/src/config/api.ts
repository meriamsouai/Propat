// API configuration
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://your-production-api.com' 
  : 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    GOOGLE: `${API_BASE_URL}/api/auth/google`,
    FACEBOOK: `${API_BASE_URL}/api/auth/facebook`,
  },
  USER: {
    PROFILE: `${API_BASE_URL}/api/user/profile`,
  },
  ORDERS: {
    HISTORY: `${API_BASE_URL}/api/orders/history`,
    CREATE: `${API_BASE_URL}/api/orders`,
  },
  CUSTOMIZATION: {
    CREATE: `${API_BASE_URL}/api/customization`,
    MY_ORDERS: `${API_BASE_URL}/api/customization/my-orders`,
    REORDER: (orderId: string) => `${API_BASE_URL}/api/customization/${orderId}/reorder`,
    ADMIN_ORDERS: `${API_BASE_URL}/api/customization/admin/orders`,
    UPDATE_STATUS: (orderId: string) => `${API_BASE_URL}/api/customization/admin/orders/${orderId}/status`,
  },
  ADMIN: {
    USERS: `${API_BASE_URL}/api/admin/users`,
  }
};

export const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
});

export const getAuthHeadersForFormData = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
});

export default API_BASE_URL;
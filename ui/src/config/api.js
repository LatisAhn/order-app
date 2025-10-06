// API 기본 URL 설정
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// API 호출 헬퍼 함수
const apiClient = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `API Error: ${response.statusText}`);
    }
    return response.json();
  },

  patch: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `API Error: ${response.statusText}`);
    }
    return response.json();
  },
};

// 메뉴 API
export const menuAPI = {
  getAll: () => apiClient.get('/api/menus'),
  getById: (menuId) => apiClient.get(`/api/menus/${menuId}`),
};

// 주문 API
export const orderAPI = {
  create: (orderData) => apiClient.post('/api/orders', orderData),
  getById: (orderId) => apiClient.get(`/api/orders/${orderId}`),
};

// 관리자 API
export const adminAPI = {
  getDashboard: () => apiClient.get('/api/admin/dashboard'),
  getInventory: () => apiClient.get('/api/admin/inventory'),
  updateStock: (menuId, stockChange) => 
    apiClient.patch(`/api/admin/inventory/${menuId}`, { stockChange }),
  getOrders: (status) => {
    const query = status ? `?status=${status}` : '';
    return apiClient.get(`/api/admin/orders${query}`);
  },
  updateOrderStatus: (orderId, status) => 
    apiClient.patch(`/api/admin/orders/${orderId}/status`, { status }),
};

export default apiClient;



import axios from 'axios';

// API Configuration
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Store for request timing
const requestTimings = new Map<string, Date>();

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request timestamp for debugging using a unique identifier
    const requestId = `${config.method}_${config.url}_${Date.now()}`;
    requestTimings.set(requestId, new Date());
    (config as any).requestId = requestId;
    
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses and errors
api.interceptors.response.use(
  (response) => {
    const requestId = (response.config as any).requestId;
    const startTime = requestTimings.get(requestId);
    const duration = startTime ? new Date().getTime() - startTime.getTime() : 0;
    
    if (requestId) {
      requestTimings.delete(requestId);
    }
    
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} (${duration}ms)`);
    
    return response;
  },
  (error) => {
    const requestId = (error.config as any)?.requestId;
    const startTime = requestTimings.get(requestId);
    const duration = startTime ? new Date().getTime() - startTime.getTime() : 0;
    
    if (requestId) {
      requestTimings.delete(requestId);
    }
    
    console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url} (${duration}ms)`, error);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/auth/login';
    } else if (error.response?.status === 403) {
      // Forbidden
      console.error('Access forbidden');
    } else if (error.response?.status === 500) {
      // Server error
      console.error('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

// API Methods
export const apiService = {
  // Authentication
  auth: {
    login: (credentials: { email: string; password: string }) =>
      api.post('/auth/login', credentials),
    
    loginWithOTP: (data: { phone: string; otp: string }) =>
      api.post('/auth/login/otp', data),
    
    register: (userData: any) =>
      api.post('/auth/register', userData),
    
    sendOTP: (phone: string) =>
      api.post('/auth/send-otp', { phone }),
    
    logout: () =>
      api.post('/auth/logout'),
    
    refreshToken: () =>
      api.post('/auth/refresh'),
    
    resetPassword: (email: string) =>
      api.post('/auth/reset-password', { email }),
  },

  // User Profile
  user: {
    getProfile: () =>
      api.get('/user/profile'),
    
    updateProfile: (data: any) =>
      api.put('/user/profile', data),
    
    changePassword: (data: { oldPassword: string; newPassword: string }) =>
      api.put('/user/change-password', data),
    
    uploadAvatar: (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);
      return api.post('/user/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
  },

  // Complaints
  complaints: {
    getAll: (params?: { page?: number; limit?: number; category?: string; status?: string }) =>
      api.get('/complaints', { params }),
    
    getById: (id: string) =>
      api.get(`/complaints/${id}`),
    
    create: (data: any) =>
      api.post('/complaints', data),
    
    update: (id: string, data: any) =>
      api.put(`/complaints/${id}`, data),
    
    delete: (id: string) =>
      api.delete(`/complaints/${id}`),
    
    uploadAttachment: (complaintId: string, file: File) => {
      const formData = new FormData();
      formData.append('attachment', file);
      return api.post(`/complaints/${complaintId}/attachments`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    
    getStats: () =>
      api.get('/complaints/stats'),
    
    track: (trackingId: string) =>
      api.get(`/complaints/track/${trackingId}`),
  },

  // Legal Services
  legal: {
    getLawyers: (params?: { 
      speciality?: string; 
      location?: string; 
      availability?: string;
      proBono?: boolean;
    }) =>
      api.get('/legal/lawyers', { params }),
    
    getLawyerById: (id: string) =>
      api.get(`/legal/lawyers/${id}`),
    
    bookConsultation: (data: {
      lawyerId: string;
      date: string;
      time: string;
      type: 'video' | 'audio' | 'chat';
    }) =>
      api.post('/legal/consultations', data),
    
    getConsultations: () =>
      api.get('/legal/consultations'),
    
    cancelConsultation: (id: string) =>
      api.delete(`/legal/consultations/${id}`),
    
    rateConsultation: (id: string, rating: number, review?: string) =>
      api.post(`/legal/consultations/${id}/rating`, { rating, review }),
  },

  // Payments
  payments: {
    createOrder: (data: { amount: number; currency: string; description: string }) =>
      api.post('/payments/create-order', data),
    
    verifyPayment: (data: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) =>
      api.post('/payments/verify', data),
    
    getTransactions: () =>
      api.get('/payments/transactions'),
    
    getTransaction: (id: string) =>
      api.get(`/payments/transactions/${id}`),
  },

  // Admin
  admin: {
    getDashboardStats: () =>
      api.get('/admin/dashboard/stats'),
    
    getComplaints: (params?: { 
      department?: string; 
      status?: string; 
      priority?: string;
      page?: number;
      limit?: number;
    }) =>
      api.get('/admin/complaints', { params }),
    
    updateComplaintStatus: (id: string, status: string, notes?: string) =>
      api.put(`/admin/complaints/${id}/status`, { status, notes }),
    
    assignComplaint: (id: string, departmentId: string, assigneeId?: string) =>
      api.put(`/admin/complaints/${id}/assign`, { departmentId, assigneeId }),
    
    generateReport: (type: 'monthly' | 'quarterly' | 'annual', params?: any) =>
      api.post(`/admin/reports/${type}`, params),
    
    getReports: () =>
      api.get('/admin/reports'),
    
    exportReport: (reportId: string, format: 'pdf' | 'excel') =>
      api.get(`/admin/reports/${reportId}/export/${format}`, {
        responseType: 'blob'
      }),
  },

  // Notifications
  notifications: {
    getAll: () =>
      api.get('/notifications'),
    
    markAsRead: (id: string) =>
      api.put(`/notifications/${id}/read`),
    
    markAllAsRead: () =>
      api.put('/notifications/read-all'),
    
    getSettings: () =>
      api.get('/notifications/settings'),
    
    updateSettings: (settings: any) =>
      api.put('/notifications/settings', settings),
  },

  // Chat/Support
  chat: {
    sendMessage: (message: string, conversationId?: string) =>
      api.post('/chat/messages', { message, conversationId }),
    
    getConversations: () =>
      api.get('/chat/conversations'),
    
    getMessages: (conversationId: string) =>
      api.get(`/chat/conversations/${conversationId}/messages`),
    
    createTicket: (data: { subject: string; message: string; priority: string }) =>
      api.post('/support/tickets', data),
    
    getTickets: () =>
      api.get('/support/tickets'),
  },

  // File Upload
  files: {
    upload: (file: File, folder?: string) => {
      const formData = new FormData();
      formData.append('file', file);
      if (folder) formData.append('folder', folder);
      
      return api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total 
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          console.log(`Upload progress: ${progress}%`);
        }
      });
    },
    
    delete: (fileId: string) =>
      api.delete(`/files/${fileId}`),
    
    getSignedUrl: (fileId: string) =>
      api.get(`/files/${fileId}/signed-url`),
  }
};

// Utility functions
export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    return {
      status,
      message: data.message || 'An error occurred',
      errors: data.errors || null
    };
  } else if (error.request) {
    // Network error
    return {
      status: 0,
      message: 'Network error. Please check your connection.',
      errors: null
    };
  } else {
    // Other error
    return {
      status: -1,
      message: error.message || 'An unexpected error occurred',
      errors: null
    };
  }
};

export const isNetworkError = (error: any) => {
  return error.code === 'NETWORK_ERROR' || !error.response;
};

export const isServerError = (error: any) => {
  return error.response && error.response.status >= 500;
};

export const isClientError = (error: any) => {
  return error.response && error.response.status >= 400 && error.response.status < 500;
};

export default api;

const API_BASE_URL = 'http://127.0.0.1:5000/api';

// Helper for standard JSON HTTP requests
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('apex_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `HTTP error ${response.status}`);
    }
    return data;
  } catch (error) {
    console.warn(`[API Warning] ${endpoint}: ${error.message}.`);
    throw error;
  }
};

export const api = {
  // Health
  checkHealth: () => request('/health'),

  // Auth: Student
  registerStudent: (userData) =>
    request('/students/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),

  loginStudent: (credentials) =>
    request('/students/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),

  // Auth: Admin
  loginAdmin: (credentials) =>
    request('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),

  // Applications
  createApplication: (appData) =>
    request('/applications', {
      method: 'POST',
      body: JSON.stringify(appData)
    }),

  getApplicationById: (id) => request(`/applications/${id}`),

  getApplicationByStudent: (studentId) => request(`/applications/student/${studentId}`),

  updateApplication: (id, updates) =>
    request(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    }),

  submitApplication: (id, payload) =>
    request(`/applications/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  // Admin APIs
  getAllApplications: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return request(`/admin/applications${params ? `?${params}` : ''}`);
  },

  getApplicationDetails: (id) => request(`/admin/applications/${id}`),

  updateApplicationStatus: (id, statusData) =>
    request(`/admin/applications/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData)
    }),

  getAdminMetrics: () => request('/admin/metrics'),

  // Documents
  getDocuments: (appId) => request(`/documents/application/${appId}`),

  uploadDocumentMetadata: (docData) =>
    request('/documents/upload', {
      method: 'POST',
      body: JSON.stringify(docData)
    }),

  verifyDocument: (docId, verifyData) =>
    request(`/documents/${docId}/verify`, {
      method: 'PUT',
      body: JSON.stringify(verifyData)
    }),

  // Notifications
  getNotifications: (studentId) => request(`/notifications/student/${studentId}`),

  markNotificationRead: (id) =>
    request(`/notifications/${id}/read`, {
      method: 'PUT'
    }),

  markAllNotificationsRead: (studentId) =>
    request(`/notifications/read-all/${studentId}`, {
      method: 'PUT'
    })
};

export default api;

// api.js
const api = {
  baseUrl: 'http://localhost:5000/api',

  get: async (endpoint) => {
    const res = await fetch(`${api.baseUrl}${endpoint}`);
    if (!res.ok) throw new Error(`GET ${endpoint} failed: ${res.statusText}`);
    return res.json();
  },

  post: async (endpoint, data) => {
    const res = await fetch(`${api.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`POST ${endpoint} failed: ${res.statusText}`);
    return res.json();
  },

  delete: async (endpoint) => {
    const res = await fetch(`${api.baseUrl}${endpoint}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`DELETE ${endpoint} failed: ${res.statusText}`);
    return res.json();
  },

  login: async (data) => {
    return api.post('/auth/login', data);
  }
};

export default api;

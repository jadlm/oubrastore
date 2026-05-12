const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function safeFetch(url, options) {
  try {
    return await fetch(url, options);
  } catch {
    const err = new Error(
      'Impossible de contacter le serveur. Lancez le backend (dossier server : npm run dev) et vérifiez NEXT_PUBLIC_API_URL dans client/.env.local.'
    );
    err.code = 'NETWORK';
    throw err;
  }
}

function getStoredTokens() {
  if (typeof window === 'undefined') return { token: null, refreshToken: null };
  return {
    token: localStorage.getItem('oubra_token'),
    refreshToken: localStorage.getItem('oubra_refresh_token')
  };
}

async function refreshAccessToken() {
  const { refreshToken } = getStoredTokens();
  if (!refreshToken) throw new Error('Session expirée.');

  const response = await safeFetch(`${API}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Session expirée.');

  localStorage.setItem('oubra_token', data.token);
  localStorage.setItem('oubra_refresh_token', data.refreshToken);
  return data.token;
}

async function request(endpoint, options = {}) {
  const { token } = getStoredTokens();
  const headers = { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }), ...options.headers };
  let res = await safeFetch(`${API}${endpoint}`, { ...options, headers });

  if (res.status === 401 && typeof window !== 'undefined' && !endpoint.startsWith('/auth/')) {
    try {
      const newToken = await refreshAccessToken();
      res = await safeFetch(`${API}${endpoint}`, {
        ...options,
        headers: { ...headers, Authorization: `Bearer ${newToken}` }
      });
    } catch (e) {
      localStorage.removeItem('oubra_token');
      localStorage.removeItem('oubra_refresh_token');
      localStorage.removeItem('oubra_user');
      throw e;
    }
  }

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error(res.ok ? 'Réponse serveur invalide.' : 'Erreur serveur');
  }
  if (!res.ok) throw new Error(data.message || 'Erreur serveur');
  return data;
}

export const api = {
  // Auth
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  refresh: (body) => request('/auth/refresh', { method: 'POST', body: JSON.stringify(body) }),
  logout: (body) => request('/auth/logout', { method: 'POST', body: JSON.stringify(body) }),
  getMe: () => request('/auth/me'),
  updateProfile: (body) => request('/auth/profile', { method: 'PUT', body: JSON.stringify(body) }),
  // Products
  getProducts: (params = '') => request(`/produits?${params}`),
  getProduct: (slug) => request(`/produits/${slug}`),
  getFeatured: () => request('/produits/featured'),
  getPromos: () => request('/produits/promos'),
  getAdminProducts: (params = '') => request(`/produits/admin/list?${params}`),
  createProduct: (body) => request('/produits', { method: 'POST', body: JSON.stringify(body) }),
  updateProduct: (id, body) => request(`/produits/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteProduct: (id) => request(`/produits/${id}`, { method: 'DELETE' }),
  // Categories
  getCategories: () => request('/categories'),
  getCategory: (slug) => request(`/categories/${slug}`),
  getAdminCategories: () => request('/categories/admin/list'),
  createCategory: (body) => request('/categories', { method: 'POST', body: JSON.stringify(body) }),
  updateCategory: (id, body) => request(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteCategory: (id) => request(`/categories/${id}`, { method: 'DELETE' }),
  // Cart
  getCart: () => request('/panier'),
  addToCart: (body) => request('/panier', { method: 'POST', body: JSON.stringify(body) }),
  updateCartQty: (id, body) => request(`/panier/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  removeFromCart: (id) => request(`/panier/${id}`, { method: 'DELETE' }),
  // Wishlist
  getWishlist: () => request('/wishlist'),
  toggleWishlist: (body) => request('/wishlist', { method: 'POST', body: JSON.stringify(body) }),
  // Orders
  createOrder: (body) => request('/commandes', { method: 'POST', body: JSON.stringify(body) }),
  getOrders: (params = '') => request(`/commandes?${params}`),
  getOrder: (id) => request(`/commandes/${id}`),
  updateOrderStatus: (id, body) => request(`/commandes/${id}/statut`, { method: 'PUT', body: JSON.stringify(body) }),
  // Reviews
  getReviews: (produitId) => request(`/avis/produit/${produitId}`),
  createReview: (body) => request('/avis', { method: 'POST', body: JSON.stringify(body) }),
  // Promos
  validatePromo: (code) => request('/promotions/validate', { method: 'POST', body: JSON.stringify({ code }) }),
  // Contact
  sendContact: (body) => request('/contact', { method: 'POST', body: JSON.stringify(body) }),
  // Devis
  sendDevis: (formData) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('oubra_token') : null;
    return safeFetch(`${API}/devis`, { method: 'POST', body: formData, headers: token ? { Authorization: `Bearer ${token}` } : {} }).then((r) => r.json());
  },
  // Blog
  getBlog: () => request('/blog'),
  getBlogPost: (slug) => request(`/blog/${slug}`),
  // Dashboard
  getStats: () => request('/dashboard/stats'),
  getAdminClients: (params = '') => request(`/dashboard/clients?${params}`),
  getAdminNotifications: () => request('/dashboard/notifications'),
  uploadProductImage: async ({ produit_id, file, principale = 1, alt = '' }) => {
    const { token } = getStoredTokens();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('produit_id', String(produit_id));
    formData.append('principale', String(principale));
    formData.append('alt', alt);

    const response = await safeFetch(`${API}/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erreur upload image');
    return data;
  }
};

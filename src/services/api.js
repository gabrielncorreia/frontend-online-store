import { getSessionToken } from './session';

// Mercado Livre now refuses unauthenticated searches, so the app goes through a
// small proxy (github.com/gabrielncorreia/mercado-livre-proxy) that holds the token.
const DEPLOYED = 'https://mercado-livre-proxy.gnc-apps-7.workers.dev';
const API = process.env.REACT_APP_PROXY_URL
  || (process.env.NODE_ENV === 'production' ? DEPLOYED : 'http://localhost:8799');

async function get(path, retried = false) {
  const token = await getSessionToken(API, retried);
  const response = await fetch(`${API}${path}`, { headers: { authorization: `Bearer ${token}` } });
  // The session may have expired between checks, or the proxy restarted: renew once.
  if (response.status === 401 && !retried) return get(path, true);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

export function getCategories() {
  return get('/categories');
}

export function getProductsFromCategoryAndQuery(categoryId = '', query = '') {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (categoryId) params.set('category', categoryId);
  return get(`/search?${params}`);
}

export function getProduct(id) {
  return get(`/items/${encodeURIComponent(id)}`);
}

export function setToken(token) {
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
}
export function getToken() {
  return localStorage.getItem('token');
}
export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('userAuthData');
}
export function parseApiError(err) {
  return err?.response?.data?.msg || err?.message || 'Network or server error';
}
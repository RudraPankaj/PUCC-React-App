import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token automatically (if present in localStorage)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export async function login(payload) {
  const res = await api.post('/auth/login', payload);
  return res.data;
}
export async function register(payload) {
  const res = await api.post('/auth/register', payload);
  return res.data;
}
export async function getMe() {
  const res = await api.get('/auth/me');
  return res.data;
}

// Users
export async function updateProfile(payload) {
  const res = await api.patch('/users/update-profile', payload);
  return res.data;
}

// Events
export async function getEvents() {
  const res = await api.get('/events');
  return res.data;
}
export async function createEvent(payload) {
  const res = await api.post('/events', payload);
  return res.data;
}

// Global chat REST helpers
export async function getGlobalMessages() {
  const res = await api.get('/messages/global-chat');
  return res.data.messages ?? res.data;
}

// Post a global message
export async function postGlobalMessage(message) {
  const res = await api.post('/messages/global-chat', message);
  return res.data;
}

// Delete a global message
export async function deleteGlobalMessage(messageId) {
  const res = await api.delete(`/messages/global-chat/${messageId}`);
  return res.data;
}

export default api;
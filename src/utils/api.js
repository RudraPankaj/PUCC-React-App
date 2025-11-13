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

// Users
export async function getMe() {
  const res = await api.get('/users/me');
  return res.data;
}
export async function getUsers() {
  const res = await api.get('/users');
  return res.data.users ?? res.data;
}
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
export async function updateEvent(eventId, payload) {
  const res = await api.put(`/events/${eventId}`, payload);
  return res.data;
}
export async function deleteEvent(eventId) {
  const res = await api.delete(`/events/${eventId}`);
  return res.data;
}


// Global chat and messages
export async function getGlobalMessages() {
  const res = await api.get('/messages/global-chat');
  return res.data.messages ?? res.data;
}
export async function postGlobalMessage(message) {
  const res = await api.post('/messages/global-chat', message);
  return res.data;
}
export async function deleteGlobalMessage(messageId) {
  const res = await api.delete(`/messages/global-chat/${messageId}`);
  return res.data;
}

// Announcements
export async function getAnnouncements() {
    const res = await api.get('/announcements');
    return res.data;
}
export async function createAnnouncement(payload) {
    const res = await api.post('/announcements', payload);
    return res.data;
}
export async function updateAnnouncement(announcementId, payload) {
    const res = await api.put(`/announcements/${announcementId}`, payload);
    return res.data;
}
export async function deleteAnnouncement(announcementId) {
    const res = await api.delete(`/announcements/${announcementId}`);
    return res.data;
}


export default api;
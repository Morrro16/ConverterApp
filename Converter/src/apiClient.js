import axios from 'axios';

// Use same-origin requests by default (/api/*).
// In production, ignore absolute URLs to avoid bypassing platform rewrites and hitting CORS.
const rawBaseURL = (import.meta.env.VITE_API_BASE_URL || '').trim();
const isAbsoluteBaseURL = /^https?:\/\//i.test(rawBaseURL);
const baseURL = import.meta.env.PROD && isAbsoluteBaseURL ? '' : rawBaseURL;

export const apiClient = axios.create({
  baseURL,
});

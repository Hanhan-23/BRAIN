import axios from 'axios';

// Membuat instance axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Base URL dari environment
});

// Interceptor Request: Tambahkan Authorization Header kalau token ada
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor Response: Auto Refresh Token jika expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh');

        if (refreshToken) {
          // Meminta token baru
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`, {
            refresh: refreshToken,
          });

          const newAccessToken = res.data.access;
          localStorage.setItem('token', newAccessToken);

          // Ulangi request dengan token baru
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Refresh token gagal:', refreshError);
        // Redirect ke login kalau refresh token juga gagal
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh');
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

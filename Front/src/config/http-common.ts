import axios from 'axios';

const ACCESS_KEY  = 'iye_access_token';
const REFRESH_KEY = 'iye_refresh_token';
const USER_KEY    = 'iye_user';

const KC_TOKEN_URL = 'http://localhost:8180/realms/iye/protocol/openid-connect/token';
const KC_CLIENT    = 'iye-frontend';

/** Refresca el access token si expira en menos de 60 segundos */
const getValidToken = async (): Promise<string | null> => {
  const token = localStorage.getItem(ACCESS_KEY);
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp: number = payload?.exp ?? 0;
    const secsLeft = exp - Date.now() / 1000;

    if (secsLeft > 60) return token; // todavía válido

    // Refrescar
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    if (!refreshToken) return null;

    const params = new URLSearchParams({
      grant_type:    'refresh_token',
      client_id:     KC_CLIENT,
      refresh_token: refreshToken,
    });

    const { data } = await axios.post<{ access_token: string; refresh_token: string }>(
      KC_TOKEN_URL,
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    localStorage.setItem(ACCESS_KEY,  data.access_token);
    localStorage.setItem(REFRESH_KEY, data.refresh_token);
    return data.access_token;
  } catch {
    // Refresh expirado — limpiar sesión
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

const httpCommon = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor request: adjunta el token (refrescándolo si es necesario)
httpCommon.interceptors.request.use(
  async (config) => {
    const token = await getValidToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response: 401 → limpiar sesión y redirigir al login
httpCommon.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(USER_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default httpCommon;

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// ─── Constantes de Keycloak ───────────────────────────────────────────────────

const KC_URL    = window.RUNTIME_CONFIG?.KEYCLOAK_URL || 'http://localhost:8180';
const KC_REALM  = window.RUNTIME_CONFIG?.KEYCLOAK_REALM || 'iye';
const KC_CLIENT = window.RUNTIME_CONFIG?.KEYCLOAK_CLIENT || 'iye-frontend';

/** Endpoint de token del realm */
const TOKEN_URL = `${KC_URL}/realms/${KC_REALM}/protocol/openid-connect/token`;

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface AuthUser {
  name: string;
  email: string;
  username: string;
  roles: string[];
  avatar: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  hasRole: (role: string) => boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | null;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Keys de localStorage ─────────────────────────────────────────────────────

const ACCESS_KEY  = 'iye_access_token';
const REFRESH_KEY = 'iye_refresh_token';
const USER_KEY    = 'iye_user';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const saveSession = (access: string, refresh: string, user: AuthUser) => {
  localStorage.setItem(ACCESS_KEY,  access);
  localStorage.setItem(REFRESH_KEY, refresh);
  localStorage.setItem(USER_KEY,    JSON.stringify(user));
};

const clearSession = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
};

/** Decodifica el payload del JWT sin verificar la firma (solo para leer claims) */
const parseJwt = (token: string): Record<string, unknown> => {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return {};
  }
};

/** Extrae roles de realm_access y resource_access del payload de Keycloak */
const extractRoles = (payload: Record<string, unknown>): string[] => {
  const realmRoles =
    (payload?.realm_access as { roles?: string[] })?.roles ?? [];
  const clientRoles =
    (payload?.resource_access as Record<string, { roles?: string[] }>)?.[KC_CLIENT]?.roles ?? [];
  return [...new Set([...realmRoles, ...clientRoles])];
};

const buildUser = (payload: Record<string, unknown>): AuthUser => {
  const fullName = (payload?.name as string) ?? (payload?.preferred_username as string) ?? '';
  const initials = fullName
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0] ?? '')
    .join('')
    .toUpperCase();

  return {
    name:     fullName,
    email:    (payload?.email    as string) ?? '',
    username: (payload?.preferred_username as string) ?? '',
    roles:    extractRoles(payload),
    avatar:   initials || '?',
  };
};

/** Intenta refrescar el access token usando el refresh token guardado */
const tryRefresh = async (): Promise<{ access: string; refresh: string } | null> => {
  const refreshToken = localStorage.getItem(REFRESH_KEY);
  if (!refreshToken) return null;

  try {
    const params = new URLSearchParams({
      grant_type:    'refresh_token',
      client_id:     KC_CLIENT,
      refresh_token: refreshToken,
    });

    const { data } = await axios.post<{ access_token: string; refresh_token: string }>(
      TOKEN_URL,
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    return { access: data.access_token, refresh: data.refresh_token };
  } catch {
    return null;
  }
};

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token,     setToken]     = useState<string | null>(null);
  const [user,      setUser]      = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Al montar: restaurar sesión o intentar refrescar el token
  useEffect(() => {
    const restore = async () => {
      const stored = localStorage.getItem(ACCESS_KEY);
      const raw    = localStorage.getItem(USER_KEY);

      if (stored && raw) {
        // Verificar que el access token no esté expirado
        const payload = parseJwt(stored);
        const exp = payload?.exp as number | undefined;
        const isExpired = exp ? Date.now() / 1000 > exp : true;

        if (!isExpired) {
          setToken(stored);
          setUser(JSON.parse(raw) as AuthUser);
        } else {
          // Intentar refrescar silenciosamente
          const refreshed = await tryRefresh();
          if (refreshed) {
            const payload = parseJwt(refreshed.access);
            const u = buildUser(payload);
            setToken(refreshed.access);
            setUser(u);
            saveSession(refreshed.access, refreshed.refresh, u);
          } else {
            clearSession();
          }
        }
      }

      setIsLoading(false);
    };

    restore();
  }, []);

  /**
   * Login via Resource Owner Password Credentials (ROPC) de Keycloak.
   * Keycloak devuelve un JWT real que el backend valida directamente.
   *
   * IMPORTANTE: en Keycloak hay que activar "Direct access grants" en el cliente iye-frontend.
   */
  const login = async (username: string, password: string) => {
    const params = new URLSearchParams({
      grant_type: 'password',
      client_id:  KC_CLIENT,
      username,
      password,
    });

    const { data } = await axios.post<{
      access_token:  string;
      refresh_token: string;
    }>(
      TOKEN_URL,
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const payload = parseJwt(data.access_token);
    const u = buildUser(payload);

    setToken(data.access_token);
    setUser(u);
    saveSession(data.access_token, data.refresh_token, u);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    clearSession();
  };

  const hasRole = (role: string) =>
    user?.roles.some((r) => r.toLowerCase() === role.toLowerCase()) ?? false;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!token, isLoading, user, hasRole, login, logout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

import React, { createContext, useState, useEffect, ReactNode, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../lib/toast.tsx';
import axios from 'axios';

interface UserData {
  username: string;
  fullname: string;
  email: string;
  phonenumber: string;
  address?: {
    shipping?: string;
    billing?: string;
  };
}

interface AuthContextType {
  user: UserData | null;
  authToken: string | null;
  refreshToken: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /** Logout User */
  const logoutUser = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    setAuthToken(null);
    setRefreshToken(null);
    setUser(null);
    navigate('/accounts/login');
    showToast({ type: "info", title: "Logged Out", description: "You have been logged out." });
  }, [navigate]);

  const api = React.useMemo(() => {
    const instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    /** Attach access token */
    instance.interceptors.request.use( (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    /** Handle token refresh on 401 */
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            if (!refreshToken) throw new Error('No refresh token');

            const response = await axios.post(`${baseURL}auth/token/refresh/`, {
              refresh: refreshToken,
            });

            const newAccessToken = response.data.access;
            const newRefreshToken = response.data.refresh || refreshToken;

            localStorage.setItem('authToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            setAuthToken(newAccessToken);
            setRefreshToken(newRefreshToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          } catch (refreshError) {
            console.error("Unable to refresh token:", refreshError);
            logoutUser();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [authToken, refreshToken, logoutUser]);


  /** Fetch user info */
  const fetchUser = useCallback(async () => {
    setLoading(true);
    if (!authToken) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const response = await api.get('auth/user/');
      setUser(response.data.data);
    } catch (err) {
      console.error('Fetch user failed', err);
      logoutUser();
    } finally {
      setLoading(false);
    }
  }, [authToken, api, logoutUser]);


  /** Automatic silent refresh */
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!refreshToken) return;
      try {
        const res = await axios.post(`${baseURL}auth/token/refresh/`, { refresh: refreshToken });
        const newAccessToken = res.data.access;
        const newRefreshToken = res.data.refresh || refreshToken;
        localStorage.setItem('authToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        setAuthToken(newAccessToken);
        setRefreshToken(newRefreshToken);
      } catch (err) {
        logoutUser();
      }
    }, 14 * 60 * 1000); // refresh every 14 minutes (before access token expires)
    return () => clearInterval(interval);
  }, [refreshToken, logoutUser]);


  /** Initialize */
  useEffect(() => {
    if (authToken) {
      fetchUser();
    } else {
      // setUser(null);
      setLoading(false);
    }
  }, [authToken, fetchUser]);

  /** Login */
  const login = async (accessToken: string, newRefreshToken: string) => {
    localStorage.setItem('authToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    setAuthToken(accessToken);
    setRefreshToken(newRefreshToken);
  };

  const isAuthenticated = !!authToken && !!user && !loading;

  return (
    <AuthContext.Provider value={{ user, authToken, refreshToken, login, logout: logoutUser, isAuthenticated, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

/** Hook to use AuthContext */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within AuthProvider');

  return context;
}; 
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

  const logoutUser = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('unverifiedUserEmail');
    setAuthToken(null);
    setRefreshToken(null);
    setUser(null);
    navigate('/accounts/login');
    showToast({ type: "info", title: "Logged Out", description: "You have been logged out." });
  }, [setAuthToken, setRefreshToken, setUser, navigate]);

  const api = React.useMemo(() => {
    const instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const currentRefreshToken = localStorage.getItem('refreshToken');
            if (!currentRefreshToken) {
              logoutUser();
              return Promise.reject(error);
            }
            const response = await axios.post(`${baseURL}token/refresh/`, {
              refresh: currentRefreshToken,
            });
            const newAccessToken = response.data.access;
            localStorage.setItem('authToken', newAccessToken);
            setAuthToken(newAccessToken);
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
  }, [setAuthToken, logoutUser]);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    if (authToken) {
      try {
        const response = await api.get("user/");

        const userDataFromAPI = response.data.data;

        if (userDataFromAPI && userDataFromAPI.username && userDataFromAPI.email) {
          setUser(userDataFromAPI);
        } else {
          console.warn("User data from API is incomplete or invalid (expected in data.data):", response.data);
          logoutUser();
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [authToken, api, logoutUser]);

  useEffect(() => {
    if (authToken) {
      fetchUser();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [authToken, fetchUser]);

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
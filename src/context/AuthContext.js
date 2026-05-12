'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('oubra_token');
    const refreshToken = localStorage.getItem('oubra_refresh_token');
    const savedUser = localStorage.getItem('oubra_user');
    if (token && refreshToken && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (token, refreshToken, userData) => {
    localStorage.setItem('oubra_token', token);
    localStorage.setItem('oubra_refresh_token', refreshToken);
    localStorage.setItem('oubra_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem('oubra_refresh_token');
    if (refreshToken) {
      try {
        const { api } = await import('@/lib/api');
        await api.logout({ refreshToken });
      } catch (e) {}
    }
    localStorage.removeItem('oubra_token');
    localStorage.removeItem('oubra_refresh_token');
    localStorage.removeItem('oubra_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

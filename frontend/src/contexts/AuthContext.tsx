import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';
import { hashPasswordSha256 } from '../utils/crypto';

interface User {
  id: number;
  email: string;
  username: string;
  name: string;
  role?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string, name?: string) => Promise<void>;
  updateProfile: (data: { name?: string; email?: string; password?: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      api.setToken(token);

      // In a real app, verify token with backend
      // For now, just assume valid
      const raw = localStorage.getItem('userData');
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.id) {
            setUser(parsed);
          }
        } catch (e) {
          // Token is invalid
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const hashedPassword = await hashPasswordSha256(password);
      const res = await api.login({ email, password: hashedPassword });
      const userData = { id: res.id, email: res.email, username: res.username, name: res.name, role: res.role };
      setUser(userData);
      const serialized = JSON.stringify(userData);
      localStorage.setItem('userData', serialized);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string, name?: string) => {
    setIsLoading(true);
    try {
      const hashedPassword = await hashPasswordSha256(password);
      const res = await api.register({ email, password: hashedPassword, username, name });
      const role = res.role || 'USER';
      const userData = { id: res.id, email: res.email, username: res.username, name: res.name, role };
      setUser(userData);
      const serialized = JSON.stringify(userData);
      localStorage.setItem('userData', serialized);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: { name?: string; email?: string; password?: string }) => {
    if (!user) {
      return;
    }
    setIsLoading(true);
    try {
      const payload = { ...data };
      if (payload.password) {
        payload.password = await hashPasswordSha256(payload.password);
      }
      const updated = await api.updateUser(user.id, payload);
      const userData = {
        id: updated.id,
        email: updated.email,
        username: updated.username,
        name: updated.name,
        role: updated.role,
      };
      setUser(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    api.logout();
    setUser(null);
    localStorage.removeItem('userData');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

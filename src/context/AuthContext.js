import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../api/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/user/login', { email, password });
      const { jwt_token } = response.data;
      localStorage.setItem('token', jwt_token);
      api.defaults.headers.common['Authorization'] = `Bearer ${jwt_token}`;
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
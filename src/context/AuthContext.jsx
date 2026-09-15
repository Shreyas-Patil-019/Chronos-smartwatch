import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    // Placeholder login architecture for Phase 1
    setTimeout(() => {
      setUser({ id: 'u101', name: 'Chronos Collector', email });
      setIsLoading(false);
    }, 500);
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({ id: 'u102', name, email });
      setIsLoading(false);
    }, 500);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  loginUser,
  registerUser,
  requestPasswordReset as requestResetService,
  getStoredUser,
  setStoredUser,
} from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Sync user changes to safe localStorage storage
  useEffect(() => {
    setStoredUser(user);
  }, [user]);

  const login = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const userProfile = await loginUser({ email, password });
      setUser(userProfile);
      return { success: true, user: userProfile };
    } catch (error) {
      const message = error?.message || 'Authentication failed. Please check your credentials.';
      setAuthError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const userProfile = await registerUser({ name, email, password });
      setUser(userProfile);
      return { success: true, user: userProfile };
    } catch (error) {
      const message = error?.message || 'Registration failed. Please verify your details.';
      setAuthError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const requestPasswordReset = async (email) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const result = await requestResetService(email);
      return result;
    } catch (error) {
      const message = error?.message || 'Password reset request failed.';
      setAuthError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAuthError(null);
    setStoredUser(null);
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    authError,
    login,
    register,
    requestPasswordReset,
    logout,
    clearAuthError,
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

export default AuthProvider;

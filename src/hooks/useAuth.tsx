import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '../utils/api';

interface User {
  id: number;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const storedToken = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
        
        // Verify token with server
        verifyToken(storedToken);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        logout();
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async (tokenToVerify: string) => {
    try {
      const userData = await apiClient.getCurrentUser();
      // If we get here, the token is valid and we have user data
      setUser(userData as User);
      setIsLoading(false);
    } catch (error) {
      console.error('Token verification failed:', error);
      // Don't immediately logout on network errors, just set loading to false
      setIsLoading(false);
      // Only logout if it's an authentication error
      if (error instanceof Error && (error.message.includes('401') || error.message.includes('Token'))) {
        console.log('Token is invalid, logging out');
        logout();
      }
    }
  };

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('adminToken', newToken);
    localStorage.setItem('adminUser', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      // Call logout endpoint to invalidate token on server
      if (token) {
        await apiClient.logout();
      }
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token && !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
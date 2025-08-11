import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('nyayasetu_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data based on email
    let mockUser: User;
    
    if (email === 'admin@nyayasetu.com') {
      mockUser = {
        id: 'admin-1',
        name: 'System Administrator',
        email: 'admin@nyayasetu.com',
        phone: '+91 9876543210',
        role: 'admin',
        isVerified: true,
        createdAt: new Date(),
        permissions: ['manage_users', 'manage_lawyers', 'view_analytics']
      };
    } else if (email.includes('lawyer')) {
      mockUser = {
        id: 'lawyer-1',
        name: 'Advocate Priya Sharma',
        email: email,
        phone: '+91 9876543211',
        role: 'lawyer',
        isVerified: true,
        createdAt: new Date(),
        barCouncilId: 'DL/12345/2020',
        practiceAreas: ['Civil Law', 'Criminal Law', 'Family Law'],
        experience: 8,
        rating: 4.7
      };
    } else {
      mockUser = {
        id: 'citizen-1',
        name: 'Rahul Kumar',
        email: email,
        phone: '+91 9876543212',
        role: 'citizen',
        isVerified: true,
        createdAt: new Date()
      };
    }
    
    setUser(mockUser);
    localStorage.setItem('nyayasetu_user', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const register = async (userData: Partial<User>, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: `${userData.role}-${Date.now()}`,
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      role: userData.role || 'citizen',
      isVerified: userData.role === 'citizen', // Citizens auto-verified, lawyers need admin approval
      createdAt: new Date(),
      ...userData
    };
    
    if (userData.role === 'citizen') {
      setUser(newUser);
      localStorage.setItem('nyayasetu_user', JSON.stringify(newUser));
    }
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nyayasetu_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
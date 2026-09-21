import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authService, RegisterPayload, DemoAccount, DEMO_ACCOUNTS } from '../services/authService';

export type AuthStatus = 'unauthenticated' | 'authenticating' | 'authenticated' | 'logging_out';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  authStatus: AuthStatus;
  activeRoleMode: 'renter' | 'owner';
  demoAccounts: DemoAccount[];
  login: (email: string, password?: string) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<{ user: User; verificationCode: string }>;
  logout: () => Promise<void>;
  switchRoleMode: (mode: 'renter' | 'owner') => Promise<void>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string; resetCode: string }>;
  resetPassword: (email: string, newPassword: string) => Promise<{ success: boolean }>;
  verifyCode: (email: string, code: string) => Promise<User>;
  resendVerificationCode: (email: string) => Promise<string>;
  demoLogin: (accountType: 'renter' | 'owner' | 'unverified') => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authStatus, setAuthStatus] = useState<AuthStatus>('authenticating');
  const [activeRoleMode, setActiveRoleMode] = useState<'renter' | 'owner'>('renter');

  useEffect(() => {
    let isMounted = true;
    authService.getCurrentUser().then((u) => {
      if (isMounted) {
        if (u) {
          setUser(u);
          setActiveRoleMode(u.activeRoleMode || 'renter');
          setAuthStatus('authenticated');
        } else {
          setUser(null);
          setAuthStatus('unauthenticated');
        }
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password?: string): Promise<User> => {
    setIsLoading(true);
    setAuthStatus('authenticating');
    try {
      const updated = await authService.login(email, password);
      setUser(updated);
      setActiveRoleMode(updated.activeRoleMode || 'renter');
      setAuthStatus('authenticated');
      return updated;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload): Promise<{ user: User; verificationCode: string }> => {
    setIsLoading(true);
    setAuthStatus('authenticating');
    try {
      const res = await authService.register(payload);
      setUser(res.user);
      setActiveRoleMode(res.user.activeRoleMode || 'renter');
      setAuthStatus('authenticated');
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setAuthStatus('logging_out');
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setAuthStatus('unauthenticated');
    } finally {
      setIsLoading(false);
    }
  };

  const switchRoleMode = async (mode: 'renter' | 'owner') => {
    const updated = await authService.switchRoleMode(mode);
    setUser(updated);
    setActiveRoleMode(mode);
  };

  const forgotPassword = async (email: string) => {
    return await authService.forgotPassword(email);
  };

  const resetPassword = async (email: string, newPassword: string) => {
    return await authService.resetPassword(email, newPassword);
  };

  const verifyCode = async (email: string, code: string): Promise<User> => {
    setIsLoading(true);
    try {
      const updated = await authService.verifyCode(email, code);
      setUser(updated);
      return updated;
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationCode = async (email: string): Promise<string> => {
    return await authService.resendVerificationCode(email);
  };

  const demoLogin = async (accountType: 'renter' | 'owner' | 'unverified'): Promise<User> => {
    let email = 'kareem.tarek@example.com';
    if (accountType === 'owner') {
      email = 'nour.photo@example.com';
    } else if (accountType === 'unverified') {
      email = 'new.user@example.com';
    }
    return await login(email, 'password123');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        authStatus,
        activeRoleMode,
        demoAccounts: DEMO_ACCOUNTS,
        login,
        register,
        logout,
        switchRoleMode,
        forgotPassword,
        resetPassword,
        verifyCode,
        resendVerificationCode,
        demoLogin
      }}
    >
      {children}
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


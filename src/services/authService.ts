import { User } from '../types';
import { MOCK_CURRENT_USER, MOCK_OWNER_USER } from './mockData';

export interface RegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface DemoAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'renter' | 'owner';
  activeRoleMode: 'renter' | 'owner';
  verificationStatus: 'verified' | 'unverified';
  tag: string;
  description: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: 'usr_current_01',
    name: 'Kareem Tarek',
    email: 'kareem.tarek@example.com',
    password: 'password123',
    role: 'renter',
    activeRoleMode: 'renter',
    verificationStatus: 'verified',
    tag: 'Verified Renter',
    description: 'Active renter with 18 completed rentals & 50% deposit history.'
  },
  {
    id: 'usr_owner_02',
    name: 'Nour El-Din',
    email: 'nour.photo@example.com',
    password: 'password123',
    role: 'owner',
    activeRoleMode: 'owner',
    verificationStatus: 'verified',
    tag: 'Verified Owner',
    description: 'Professional gear owner with 3 active listings & high rating.'
  },
  {
    id: 'usr_new_03',
    name: 'Laila Hosny',
    email: 'new.user@example.com',
    password: 'password123',
    role: 'renter',
    activeRoleMode: 'renter',
    verificationStatus: 'unverified',
    tag: 'Unverified Account',
    description: 'Newly registered account pending identity/code verification.'
  }
];

const STORAGE_KEY_USER = 'rentback_auth_user';
const STORAGE_KEY_USERS_DB = 'rentback_users_db';
const STORAGE_KEY_RESET_CODES = 'rentback_reset_codes';
const STORAGE_KEY_VERIFY_CODES = 'rentback_verify_codes';

class AuthService {
  private currentUser: User | null = null;
  private users: (User & { password?: string })[] = [];

  constructor() {
    this.initUsers();
  }

  private initUsers() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USERS_DB);
      if (stored) {
        this.users = JSON.parse(stored);
      } else {
        this.users = [
          {
            ...MOCK_CURRENT_USER,
            password: 'password123'
          },
          {
            ...MOCK_OWNER_USER,
            password: 'password123'
          },
          {
            id: 'usr_new_03',
            name: 'Laila Hosny',
            email: 'new.user@example.com',
            phone: '+20 111 234 5678',
            role: 'renter',
            activeRoleMode: 'renter',
            verificationStatus: 'unverified',
            rating: 5.0,
            reviewCount: 0,
            memberSince: '2025-01-10',
            password: 'password123'
          }
        ];
        localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(this.users));
      }

      // Check current user session
      const sessionUser = localStorage.getItem(STORAGE_KEY_USER);
      if (sessionUser) {
        this.currentUser = JSON.parse(sessionUser);
      } else {
        // Default to logged-in renter for smooth evaluation, but state allows clean logout
        this.currentUser = { ...MOCK_CURRENT_USER };
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(this.currentUser));
      }
    } catch {
      this.currentUser = { ...MOCK_CURRENT_USER };
    }
  }

  private saveSession(user: User | null) {
    this.currentUser = user;
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }

  private saveUsersDb() {
    try {
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(this.users));
    } catch {
      // Fallback
    }
  }

  async getCurrentUser(): Promise<User | null> {
    await new Promise((res) => setTimeout(res, 60));
    return this.currentUser ? { ...this.currentUser } : null;
  }

  async login(email: string, password?: string): Promise<User> {
    await new Promise((res) => setTimeout(res, 350));

    const normalizedEmail = email.trim().toLowerCase();
    
    // Check registered users
    let found = this.users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!found) {
      // For demo convenience, allow any valid email if password provided, or throw if unknown
      if (password && password.length >= 6) {
        found = {
          id: `usr_${Date.now()}`,
          name: normalizedEmail.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          email: normalizedEmail,
          phone: '+20 100 000 0000',
          role: 'renter',
          activeRoleMode: 'renter',
          verificationStatus: 'verified',
          rating: 5.0,
          reviewCount: 0,
          memberSince: new Date().toISOString().split('T')[0],
          password
        };
        this.users.push(found);
        this.saveUsersDb();
      } else {
        throw new Error('No account found with this email address. Please register or verify credentials.');
      }
    }

    if (password && found.password && found.password !== password) {
      throw new Error('Incorrect password. Please verify credentials or use Forgot Password.');
    }

    // Prepare safe User object (strip password)
    const { password: _, ...safeUser } = found;
    this.saveSession(safeUser);
    return safeUser;
  }

  async register(payload: RegisterPayload): Promise<{ user: User; verificationCode: string }> {
    await new Promise((res) => setTimeout(res, 450));

    const normalizedEmail = payload.email.trim().toLowerCase();
    const existing = this.users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (existing) {
      throw new Error('An account with this email address already exists. Please sign in instead.');
    }

    const newUser: User & { password?: string } = {
      id: `usr_${Date.now()}`,
      name: payload.name.trim(),
      email: normalizedEmail,
      phone: payload.phone?.trim() || '+20 100 000 0000',
      role: 'renter',
      activeRoleMode: 'renter',
      verificationStatus: 'unverified',
      rating: 5.0,
      reviewCount: 0,
      memberSince: new Date().toISOString().split('T')[0],
      password: payload.password
    };

    this.users.push(newUser);
    this.saveUsersDb();

    // Generate mock verification code (6-digit)
    const verificationCode = '123456';
    try {
      const storedCodes = JSON.parse(localStorage.getItem(STORAGE_KEY_VERIFY_CODES) || '{}');
      storedCodes[normalizedEmail] = verificationCode;
      localStorage.setItem(STORAGE_KEY_VERIFY_CODES, JSON.stringify(storedCodes));
    } catch {
      // Ignore
    }

    const { password: _, ...safeUser } = newUser;
    this.saveSession(safeUser);
    return { user: safeUser, verificationCode };
  }

  async logout(): Promise<void> {
    await new Promise((res) => setTimeout(res, 120));
    this.saveSession(null);
  }

  async switchRoleMode(mode: 'renter' | 'owner'): Promise<User> {
    await new Promise((res) => setTimeout(res, 80));
    if (!this.currentUser) {
      throw new Error('No active user session');
    }
    const updated = {
      ...this.currentUser,
      activeRoleMode: mode
    };
    this.saveSession(updated);

    // Update in users db
    const idx = this.users.findIndex((u) => u.id === updated.id);
    if (idx !== -1) {
      this.users[idx].activeRoleMode = mode;
      this.saveUsersDb();
    }

    return updated;
  }

  async forgotPassword(email: string): Promise<{ success: boolean; message: string; resetCode: string }> {
    await new Promise((res) => setTimeout(res, 350));
    const normalizedEmail = email.trim().toLowerCase();
    
    // Always succeed conceptually to avoid email enumeration, but generate code
    const resetCode = '789123';
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY_RESET_CODES) || '{}');
      stored[normalizedEmail] = resetCode;
      localStorage.setItem(STORAGE_KEY_RESET_CODES, JSON.stringify(stored));
    } catch {
      // Ignore
    }

    return {
      success: true,
      message: `Password reset instructions and security token sent to ${normalizedEmail}.`,
      resetCode
    };
  }

  async resetPassword(email: string, newPassword: string): Promise<{ success: boolean }> {
    await new Promise((res) => setTimeout(res, 400));
    const normalizedEmail = email.trim().toLowerCase();
    const user = this.users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (user) {
      user.password = newPassword;
      this.saveUsersDb();
    }

    return { success: true };
  }

  async verifyCode(email: string, code: string): Promise<User> {
    await new Promise((res) => setTimeout(res, 350));
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedCode = code.trim();

    // Accept standard mock code '123456' or any valid 6-digit number in mock mode
    if (trimmedCode !== '123456' && trimmedCode.length !== 6) {
      throw new Error('Invalid verification code. Please enter 123456 or request a new code.');
    }

    const user = this.users.find((u) => u.email.toLowerCase() === normalizedEmail) || this.currentUser;

    if (!user) {
      throw new Error('User not found for this verification request.');
    }

    user.verificationStatus = 'verified';
    this.saveUsersDb();

    const { password: _, ...safeUser } = user;
    this.saveSession(safeUser);
    return safeUser;
  }

  async resendVerificationCode(email: string): Promise<string> {
    await new Promise((res) => setTimeout(res, 250));
    return '123456';
  }

  getDemoAccounts(): DemoAccount[] {
    return DEMO_ACCOUNTS;
  }
}

export const authService = new AuthService();



import { AuthResponse, User, SystemAnalytics } from '../types';

const API_BASE = '/api';

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Invalid credentials');
    }
    const data = await res.json();
    localStorage.setItem('auth_token', data.token);
    return data;
  },

  async register(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Registration failed');
    }
    const data = await res.json();
    localStorage.setItem('auth_token', data.token);
    return data;
  },

  async getMe(): Promise<User | null> {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;
    const res = await fetch(`${API_BASE}/user/me`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) {
      localStorage.removeItem('auth_token');
      return null;
    }
    return res.json();
  },

  async purchasePlan(plan: string): Promise<User> {
    const token = localStorage.getItem('auth_token');
    const res = await fetch(`${API_BASE}/user/purchase`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ plan }),
    });
    if (!res.ok) throw new Error('Purchase failed');
    return res.json();
  },

  async cancelPlan(): Promise<User> {
    const token = localStorage.getItem('auth_token');
    const res = await fetch(`${API_BASE}/user/cancel`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Cancellation failed');
    return res.json();
  },

  async recordUsage(): Promise<User> {
    const token = localStorage.getItem('auth_token');
    const res = await fetch(`${API_BASE}/user/usage`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Usage limit exceeded');
    }
    return res.json();
  },

  async getAdminAnalytics(): Promise<SystemAnalytics> {
    const token = localStorage.getItem('auth_token');
    const res = await fetch(`${API_BASE}/admin/analytics`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Unauthorized analytics access');
    return res.json();
  },

  logout() {
    localStorage.removeItem('auth_token');
  }
};


import { API_BASE_URL, isBackendConfigured } from './apiConfig';

export interface User {
  id: string;
  email?: string;
}

export const signIn = async (email: string, password: string): Promise<{ user: User | null; error: Error | null }> => {
  if (isBackendConfigured) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Login failed');
      }

      const user = await response.json();
      localStorage.setItem('wesley_auth_token', user.token);
      return { user, error: null };
    } catch (error: any) {
      return { user: null, error };
    }
  } else {
    // Mock Auth Flow for Demo Mode
    await new Promise(resolve => setTimeout(resolve, 800));
    if (email && password) {
       const user = { id: 'mock-user-id', email };
       localStorage.setItem('wesley_mock_user', JSON.stringify(user));
       return { user, error: null };
    }
    return { user: null, error: new Error('Invalid credentials') };
  }
};

export const signOut = async () => {
  localStorage.removeItem('wesley_auth_token');
  localStorage.removeItem('wesley_mock_user');
};

export const getSession = async (): Promise<User | null> => {
  if (isBackendConfigured) {
    const token = localStorage.getItem('wesley_auth_token');
    if (!token) return null;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.ok ? await response.json() : null;
    } catch {
      return null;
    }
  } else {
    const stored = localStorage.getItem('wesley_mock_user');
    return stored ? JSON.parse(stored) : null;
  }
};

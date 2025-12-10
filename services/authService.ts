import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface User {
  id: string;
  email?: string;
}

export const signIn = async (email: string, password: string): Promise<{ user: User | null; error: Error | null }> => {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { user: data.user, error };
  } else {
    // Mock Auth Flow
    // Simulating network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email && password) {
       const user = { id: 'mock-user-id', email };
       localStorage.setItem('swiss_mock_user', JSON.stringify(user));
       return { user, error: null };
    }
    return { user: null, error: new Error('Invalid credentials') };
  }
};

export const signOut = async () => {
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut();
  } else {
    localStorage.removeItem('swiss_mock_user');
  }
};

export const getSession = async (): Promise<User | null> => {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.auth.getSession();
    return data.session?.user || null;
  } else {
    const stored = localStorage.getItem('swiss_mock_user');
    return stored ? JSON.parse(stored) : null;
  }
};
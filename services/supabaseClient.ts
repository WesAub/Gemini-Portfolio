import { createClient } from '@supabase/supabase-js';

// NOTE: In a real deployment, these would come from import.meta.env or process.env
const SUPABASE_URL = process.env.SUPABASE_URL || ''; 
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || '';

// We only create the client if keys are present.
// Otherwise we will fallback to local state management for the demo.
export const supabase = (SUPABASE_URL && SUPABASE_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_KEY) 
  : null;

export const isSupabaseConfigured = !!supabase;
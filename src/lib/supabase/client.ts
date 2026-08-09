import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export function createClient() {
  if (!isSupabaseConfigured) {
    // Return null or client with placeholder
    return createSupabaseClient(
      supabaseUrl || 'https://placeholder.supabase.co',
      supabaseAnonKey || 'placeholder'
    );
  }
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createClient();

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || '';

export function createServerClient() {
  if (!isSupabaseConfigured) {
    return null;
  }
  
  // Use the service role key if available to bypass RLS for CMS admin operations
  const keyToUse = supabaseServiceKey || supabaseAnonKey;
  
  return createSupabaseClient(supabaseUrl, keyToUse, {
    auth: {
      persistSession: false,
    },
  });
}

import { Newsletter } from '@/types/newsletter';
import rawNewsletters from '@/data/newsletters.json';
import { createServerClient, isSupabaseConfigured } from './supabase/server';

const fallbackNewsletters: Newsletter[] = rawNewsletters as Newsletter[];

export async function getPublishedNewsletters(): Promise<Newsletter[]> {
  const supabase = createServerClient();
  let fetched: Newsletter[] = [];

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('newsletters')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (!error && data && data.length > 0) {
        fetched = data as Newsletter[];
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local newsletters:', err);
    }
  }

  const local = fallbackNewsletters.filter((n) => n.status === 'published');
  
  // Merge, prioritizing Supabase items
  const mergedMap = new Map<string, Newsletter>();
  local.forEach(n => mergedMap.set(n.slug, n));
  fetched.forEach(n => mergedMap.set(n.slug, n));
  
  return Array.from(mergedMap.values()).sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

export async function getNewsletterBySlug(slug: string): Promise<Newsletter | null> {
  const supabase = createServerClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('newsletters')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error && data) {
        return data as Newsletter;
      }
    } catch (err) {
      console.warn('Supabase slug fetch failed, falling back to local:', err);
    }
  }

  const found = fallbackNewsletters.find((n) => n.slug === slug);
  return found || null;
}

export async function getAllNewsletters(): Promise<Newsletter[]> {
  const supabase = createServerClient();
  let fetched: Newsletter[] = [];

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('newsletters')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        fetched = data as Newsletter[];
      }
    } catch (err) {
      console.warn('Supabase fetch failed:', err);
    }
  }

  // Merge, prioritizing Supabase items
  const mergedMap = new Map<string, Newsletter>();
  fallbackNewsletters.forEach(n => mergedMap.set(n.slug, n));
  fetched.forEach(n => mergedMap.set(n.slug, n));
  
  return Array.from(mergedMap.values()).sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

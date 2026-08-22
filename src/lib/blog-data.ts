import { Blog } from '@/types/blog';
import rawBlogs from '@/data/blogs.json';
import { createServerClient } from './supabase/server';

const fallbackBlogs: Blog[] = rawBlogs as Blog[];

export async function getPublishedBlogs(): Promise<Blog[]> {
  const supabase = createServerClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as Blog[];
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local blogs:', err);
    }
  }

  return fallbackBlogs.filter((b) => b.status === 'published');
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const supabase = createServerClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error && data) {
        return data as Blog;
      }
    } catch (err) {
      console.warn('Supabase slug fetch failed, falling back to local:', err);
    }
  }

  const found = fallbackBlogs.find((b) => b.slug === slug);
  return found || null;
}

export async function getAllBlogs(): Promise<Blog[]> {
  const supabase = createServerClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as Blog[];
      }
    } catch (err) {
      console.warn('Supabase fetch failed:', err);
    }
  }

  return fallbackBlogs;
}

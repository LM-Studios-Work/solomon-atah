export interface Blog {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  status: 'draft' | 'published' | 'archived';
  published_at: string;
  cover_image_url?: string | null;
  excerpt?: string | null;
  content: string;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}

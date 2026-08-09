-- ==============================================================================
-- SOLOMON ATAH PODCAST & RESEARCH - NEWSLETTER SCHEMA & SUPABASE SETUP
-- ==============================================================================
-- Run this SQL in your Supabase project (SQL Editor -> New Query -> Run)

-- 1. Create the newsletters table
CREATE TABLE IF NOT EXISTS public.newsletters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    issue_number INTEGER,
    type TEXT DEFAULT 'newsletter', -- 'newsletter' | 'essay' | 'briefing' | 'dispatch'
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMPTZ DEFAULT NOW(),
    cover_image_url TEXT,
    excerpt TEXT,
    blocks JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of block objects
    tags TEXT[] DEFAULT '{}'::TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_newsletters_slug ON public.newsletters(slug);
CREATE INDEX IF NOT EXISTS idx_newsletters_status ON public.newsletters(status);
CREATE INDEX IF NOT EXISTS idx_newsletters_published_at ON public.newsletters(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletters_issue_number ON public.newsletters(issue_number DESC);

-- 3. Automatic updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_newsletters_updated_at ON public.newsletters;
CREATE TRIGGER tr_newsletters_updated_at
    BEFORE UPDATE ON public.newsletters
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.newsletters ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
-- A. Anyone can read published newsletters
DROP POLICY IF EXISTS "Public can view published newsletters" ON public.newsletters;
CREATE POLICY "Public can view published newsletters"
    ON public.newsletters
    FOR SELECT
    USING (status = 'published');

-- B. Authenticated users (admin) have full CRUD access
DROP POLICY IF EXISTS "Authenticated users have full access" ON public.newsletters;
CREATE POLICY "Authenticated users have full access"
    ON public.newsletters
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- C. Anonymous access policies for dev/CMS api integration
DROP POLICY IF EXISTS "Allow anon inserts with service role or dev" ON public.newsletters;
CREATE POLICY "Allow anon inserts with service role or dev"
    ON public.newsletters
    FOR INSERT
    TO anon
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon update for dev" ON public.newsletters;
CREATE POLICY "Allow anon update for dev"
    ON public.newsletters
    FOR UPDATE
    TO anon
    USING (true);

-- 6. Supabase Storage: newsletter-media bucket setup
INSERT INTO storage.buckets (id, name, public)
VALUES ('newsletter-media', 'newsletter-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for newsletter-media bucket
DROP POLICY IF EXISTS "Public can view newsletter images" ON storage.objects;
CREATE POLICY "Public can view newsletter images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'newsletter-media');

DROP POLICY IF EXISTS "Anyone can upload newsletter images" ON storage.objects;
CREATE POLICY "Anyone can upload newsletter images"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'newsletter-media');

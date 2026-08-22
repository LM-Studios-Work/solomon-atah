import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { Blog } from '@/types/blog';

export async function POST(req: NextRequest) {
  try {
    const body: Blog = await req.json();

    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    if (supabase) {
      const { data, error } = await supabase
        .from('blogs')
        .upsert(
          {
            id: body.id && body.id !== 'new-post' ? body.id : undefined,
            slug: body.slug,
            title: body.title,
            subtitle: body.subtitle,
            status: body.status || 'published',
            published_at: body.published_at || new Date().toISOString(),
            cover_image_url: body.cover_image_url,
            excerpt: body.excerpt,
            content: body.content,
            tags: body.tags || [],
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'slug' }
        )
        .select()
        .single();

      if (error) {
        console.error('Supabase error saving blog:', error);
        return NextResponse.json(
          { error: error.message, details: error },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        source: 'supabase',
        data,
      });
    }

    // If Supabase not yet configured, return success for local test/preview
    return NextResponse.json({
      success: true,
      source: 'local-memory',
      message: 'Supabase credentials not configured in .env.local yet; mock save succeeded.',
      data: body,
    });
  } catch (err: any) {
    console.error('Blog API route error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    const supabase = createServerClient();

    if (supabase) {
      const { error } = await supabase.from('blogs').delete().eq('id', id);

      if (error) {
        console.error('Supabase error deleting blog:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, source: 'supabase' });
    }

    return NextResponse.json({
      success: true,
      source: 'local-memory',
      message: 'Supabase credentials not configured in .env.local yet; mock delete succeeded.',
    });
  } catch (err: any) {
    console.error('Blog API route delete error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

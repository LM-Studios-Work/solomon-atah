import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { Newsletter } from '@/types/newsletter';

export async function POST(req: NextRequest) {
  try {
    const body: Newsletter = await req.json();

    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    if (supabase) {
      const { data, error } = await supabase
        .from('newsletters')
        .upsert(
          {
            id: body.id && body.id !== 'new-issue' ? body.id : undefined,
            slug: body.slug,
            title: body.title,
            subtitle: body.subtitle,
            issue_number: body.issue_number,
            type: body.type || 'newsletter',
            status: body.status || 'published',
            published_at: body.published_at || new Date().toISOString(),
            cover_image_url: body.cover_image_url,
            excerpt: body.excerpt,
            blocks: body.blocks,
            tags: body.tags || [],
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'slug' }
        )
        .select()
        .single();

      if (error) {
        console.error('Supabase error saving newsletter:', error);
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
    console.error('Newsletter API route error:', err);
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
      return NextResponse.json({ error: 'Newsletter ID is required' }, { status: 400 });
    }

    const supabase = createServerClient();

    if (supabase) {
      const { error } = await supabase
        .from('newsletters')
        .update({ deleted: true })
        .eq('id', id);

      if (error) {
        console.error('Supabase error deleting newsletter:', error);
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
    console.error('Newsletter API route delete error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

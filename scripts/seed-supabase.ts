import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load .env.local manually if not loaded
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...rest] = trimmed.split('=');
      const val = rest.join('=').trim().replace(/^["']|["']$/g, '');
      if (!process.env[key.trim()]) {
        process.env[key.trim()] = val;
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('🚀 Seeding Supabase database with newsletters...');

  const dataPath = path.resolve(process.cwd(), 'src/data/newsletters.json');
  const rawData = fs.readFileSync(dataPath, 'utf8');
  const newsletters = JSON.parse(rawData);

  for (const item of newsletters) {
    console.log(`Inserting issue: "${item.title}" (slug: ${item.slug})...`);

    const { data, error } = await supabase
      .from('newsletters')
      .upsert(
        {
          id: item.id,
          slug: item.slug,
          title: item.title,
          subtitle: item.subtitle,
          issue_number: item.issue_number,
          type: item.type || 'newsletter',
          status: item.status || 'published',
          published_at: item.published_at || new Date().toISOString(),
          cover_image_url: item.cover_image_url,
          excerpt: item.excerpt,
          blocks: item.blocks,
          tags: item.tags || [],
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'slug' }
      )
      .select();

    if (error) {
      console.error(`❌ Failed to insert ${item.slug}:`, error.message);
    } else {
      console.log(`✅ Successfully seeded: ${item.title}`);
    }
  }

  console.log('🎉 Done seeding newsletters table!');
}

seed();

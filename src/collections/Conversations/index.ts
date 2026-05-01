import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const Conversations: CollectionConfig = {
  slug: 'conversations',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'scholars', 'disciplines', 'status', 'publishedAt'],
    description:
      'The core episode archive. Each conversation syncs with a YouTube video and is enriched with editorial metadata.',
  },
  access: {
    read: ({ req }) => {
      // Public read for published; authenticated read for all
      if (req.user) return true
      return { status: { equals: 'published' } }
    },
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        if (doc.slug) {
          revalidatePath(`/conversations/${doc.slug}`)
          revalidatePath('/conversations')
          revalidatePath('/')
        }
      },
    ],
  },
  fields: [
    // ── Core ──────────────────────────────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Editorial title — may differ slightly from the YouTube title.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug, e.g. "dr-jane-smith-on-structural-adjustment"',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        description: 'Publication date (auto-set on first publish if left blank).',
        date: { pickerAppearance: 'dayOnly' },
      },
    },

    // ── YouTube ───────────────────────────────────────────────────────────────
    {
      name: 'youtubeId',
      type: 'text',
      required: true,
      admin: {
        description: 'The YouTube video ID (the part after ?v=), e.g. "dQw4w9WgXcQ"',
      },
    },
    {
      name: 'duration',
      type: 'number',
      admin: {
        description: 'Duration in seconds (auto-fetched from YouTube).',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Custom thumbnail. Falls back to YouTube thumbnail if blank.',
      },
    },
    {
      name: 'youtubeThumbnailUrl',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Auto-synced from YouTube.',
      },
    },

    // ── Editorial ─────────────────────────────────────────────────────────────
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description:
          '1–2 sentence teaser shown in cards and meta descriptions. Written for a general educated audience.',
      },
    },
    {
      name: 'editorialSummary',
      type: 'richText',
      admin: {
        description:
          '200–400 word summary written like a journal abstract. Describes the argument, method, and significance of the conversation.',
      },
    },
    {
      name: 'transcript',
      type: 'richText',
      admin: {
        description: 'Full or partial transcript. Supports accessibility and search indexing.',
      },
    },

    // ── Timestamps / Chapter Markers ─────────────────────────────────────────
    {
      name: 'timestamps',
      type: 'array',
      admin: {
        description: 'Key moments in the conversation.',
      },
      fields: [
        {
          name: 'time',
          type: 'text',
          required: true,
          label: 'Timestamp',
          admin: { description: 'e.g. "12:34"' },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Chapter title',
        },
      ],
    },

    // ── Relations ─────────────────────────────────────────────────────────────
    {
      name: 'scholars',
      type: 'relationship',
      relationTo: 'scholars',
      hasMany: true,
      required: true,
    },
    {
      name: 'disciplines',
      type: 'relationship',
      relationTo: 'disciplines',
      hasMany: true,
    },
    {
      name: 'institutions',
      type: 'relationship',
      relationTo: 'institutions',
      hasMany: true,
      admin: {
        description: 'Auto-populated from scholar profiles. Can be overridden.',
      },
    },
    {
      name: 'region',
      type: 'select',
      options: [
        { label: 'Sub-Saharan Africa', value: 'sub-saharan-africa' },
        { label: 'North Africa', value: 'north-africa' },
        { label: 'North America', value: 'north-america' },
        { label: 'Europe', value: 'europe' },
        { label: 'Asia-Pacific', value: 'asia-pacific' },
        { label: 'Latin America & Caribbean', value: 'latin-america-caribbean' },
        { label: 'Middle East', value: 'middle-east' },
        { label: 'Global / Comparative', value: 'global' },
      ],
    },

    // ── Further Reading ───────────────────────────────────────────────────────
    {
      name: 'furtherReading',
      type: 'array',
      admin: {
        description: 'Curated reading list: guest papers, related books, related conversations.',
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Paper / Article', value: 'paper' },
            { label: 'Book', value: 'book' },
            { label: 'Report', value: 'report' },
            { label: 'Related Conversation', value: 'conversation' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'paper',
        },
        { name: 'title', type: 'text', required: true },
        { name: 'author', type: 'text' },
        { name: 'year', type: 'number' },
        { name: 'url', type: 'text', label: 'URL / DOI' },
        { name: 'citation', type: 'text', label: 'Full citation (optional)' },
      ],
    },

    // ── Citation ──────────────────────────────────────────────────────────────
    {
      name: 'citationInfo',
      type: 'group',
      label: 'Citation Details',
      admin: {
        description:
          'Used to build the "How to cite this conversation" block. Fill in host name and institution if they differ from defaults.',
      },
      fields: [
        {
          name: 'hostName',
          type: 'text',
          defaultValue: 'Solomon Atah',
        },
        {
          name: 'podcastName',
          type: 'text',
          defaultValue: 'The Solomon Atah Podcast',
        },
        {
          name: 'publisher',
          type: 'text',
          defaultValue: 'Solomon Atah Media',
        },
      ],
    },

    // ── Topics / Tags ─────────────────────────────────────────────────────────
    {
      name: 'topics',
      type: 'array',
      admin: {
        description: 'Freeform keyword tags for search and filtering.',
      },
      fields: [{ name: 'topic', type: 'text', required: true }],
    },

    // ── Featured ──────────────────────────────────────────────────────────────
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Pin to the Home page "featured episode" slot.',
      },
    },
  ],
}

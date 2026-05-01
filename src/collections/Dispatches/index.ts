import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const Dispatches: CollectionConfig = {
  slug: 'dispatches',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'issue', 'status', 'publishedAt'],
    description: 'Editorial dispatches — essays, reading lists, and episode reflections.',
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { status: { equals: 'published' } }
    },
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        if (doc.slug) {
          revalidatePath(`/dispatches/${doc.slug}`)
          revalidatePath('/dispatches')
        }
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'issue',
      type: 'number',
      admin: {
        description: 'Issue number for the dispatch series.',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Essay', value: 'essay' },
        { label: 'Reading List', value: 'reading-list' },
        { label: 'Episode Reflection', value: 'reflection' },
        { label: 'Field Notes', value: 'field-notes' },
        { label: 'Interview', value: 'interview' },
      ],
      defaultValue: 'essay',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: '1–2 sentences for the card and meta description.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'relatedConversations',
      type: 'relationship',
      relationTo: 'conversations',
      hasMany: true,
    },
  ],
  timestamps: true,
}

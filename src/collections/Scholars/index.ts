import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const Scholars: CollectionConfig = {
  slug: 'scholars',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'institution', 'updatedAt'],
    description: 'Every scholar who has appeared on the podcast.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        if (doc.slug) {
          revalidatePath(`/scholars/${doc.slug}`)
          revalidatePath('/scholars')
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug, e.g. "dr-jane-smith"',
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Academic title and rank, e.g. "Associate Professor of Political Economy"',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'richText',
      admin: {
        description: 'Full biographical statement. Written in third person.',
      },
    },
    {
      name: 'institution',
      type: 'relationship',
      relationTo: 'institutions',
      admin: {
        description: 'Primary institutional affiliation.',
      },
    },
    {
      name: 'disciplines',
      type: 'relationship',
      relationTo: 'disciplines',
      hasMany: true,
    },
    {
      name: 'researchFocus',
      type: 'textarea',
      admin: {
        description:
          'One to three sentences describing their primary research areas. Used in scholar cards.',
      },
    },
    // External links
    {
      name: 'links',
      type: 'group',
      fields: [
        { name: 'website', type: 'text', label: 'Personal/Academic Website' },
        { name: 'googleScholar', type: 'text', label: 'Google Scholar URL' },
        { name: 'orcid', type: 'text', label: 'ORCID Profile URL' },
        { name: 'twitter', type: 'text', label: 'Twitter/X URL' },
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
        { name: 'academia', type: 'text', label: 'Academia.edu URL' },
        { name: 'researchgate', type: 'text', label: 'ResearchGate URL' },
      ],
    },
    // Selected publications
    {
      name: 'selectedPublications',
      type: 'array',
      admin: {
        description: 'Up to 5 key publications to feature on their profile.',
      },
      fields: [
        { name: 'citation', type: 'text', required: true, label: 'Full citation' },
        { name: 'url', type: 'text', label: 'Link to publication' },
        { name: 'year', type: 'number', label: 'Year' },
      ],
    },
    {
      name: 'country',
      type: 'text',
      admin: {
        description: 'Country of origin or primary base.',
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
        { label: 'Diaspora', value: 'diaspora' },
      ],
    },
  ],
}

import type { CollectionConfig } from 'payload'

export const Disciplines: CollectionConfig = {
  slug: 'disciplines',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
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
        description: 'URL-safe identifier, e.g. "political-economy"',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Short description shown on the discipline landing page.',
      },
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Emoji or icon character representing this discipline.',
      },
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Hex color for visual differentiation, e.g. #4A1942',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order on the disciplines index page.',
      },
    },
  ],
}

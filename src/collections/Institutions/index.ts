import type { CollectionConfig } from 'payload'

export const Institutions: CollectionConfig = {
  slug: 'institutions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'country', 'type', 'updatedAt'],
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
    },
    {
      name: 'shortName',
      type: 'text',
      admin: {
        description: 'Abbreviation, e.g. "UCT", "LSE", "WITS"',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'country',
      type: 'text',
      required: true,
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
      ],
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'University', value: 'university' },
        { label: 'Research Institute', value: 'research-institute' },
        { label: 'Think Tank', value: 'think-tank' },
        { label: 'Government', value: 'government' },
        { label: 'International Organization', value: 'international-org' },
        { label: 'NGO / Civil Society', value: 'ngo' },
        { label: 'Private Sector', value: 'private-sector' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'university',
    },
  ],
}

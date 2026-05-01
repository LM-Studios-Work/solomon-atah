import type { CollectionConfig } from 'payload'

export const PartnerInquiries: CollectionConfig = {
  slug: 'partner-inquiries',
  admin: {
    useAsTitle: 'orgName',
    defaultColumns: ['orgName', 'contactName', 'partnershipType', 'status', 'createdAt'],
    description:
      'Partnership, sponsorship, and collaboration inquiries from institutions and funders.',
  },
  access: {
    create: () => true,
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'orgName',
      type: 'text',
      required: true,
      label: 'Organisation / Institution',
    },
    {
      name: 'contactName',
      type: 'text',
      required: true,
      label: 'Contact Person',
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'contactTitle',
      type: 'text',
      label: 'Job Title / Role',
    },
    {
      name: 'partnershipType',
      type: 'select',
      required: true,
      label: 'Nature of Inquiry',
      options: [
        { label: 'Institutional Sponsorship', value: 'sponsorship' },
        { label: 'Research Collaboration', value: 'research' },
        { label: 'Media Partnership', value: 'media' },
        { label: 'Speaking Engagement', value: 'speaking' },
        { label: 'Grant / Funding Inquiry', value: 'grant' },
        { label: 'Academic Partnership', value: 'academic' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'budget',
      type: 'select',
      label: 'Indicative Budget (if applicable)',
      options: [
        { label: 'Under $1,000', value: 'under-1k' },
        { label: '$1,000–$5,000', value: '1k-5k' },
        { label: '$5,000–$20,000', value: '5k-20k' },
        { label: '$20,000–$50,000', value: '20k-50k' },
        { label: 'Over $50,000', value: 'over-50k' },
        { label: 'Not applicable / TBD', value: 'na' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
      admin: {
        description: 'Describe the nature of the partnership and what you have in mind.',
      },
    },
    {
      name: 'honeypot',
      type: 'text',
      admin: { hidden: true },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Discussion', value: 'in-discussion' },
        { label: 'Agreed', value: 'agreed' },
        { label: 'Declined', value: 'declined' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'internalNotes',
      type: 'richText',
    },
  ],
  timestamps: true,
}

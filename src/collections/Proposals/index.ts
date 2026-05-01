import type { CollectionConfig } from 'payload'

export const Proposals: CollectionConfig = {
  slug: 'proposals',
  admin: {
    useAsTitle: 'topicTitle',
    defaultColumns: ['topicTitle', 'proposerName', 'discipline', 'status', 'createdAt'],
    description: 'Guest and topic proposals submitted via the public proposal form.',
  },
  access: {
    create: () => true, // Public form submission
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => {
      return req.user?.role === 'admin'
    },
  },
  fields: [
    // Proposer (person submitting — may be the guest or a nominator)
    {
      name: 'proposerName',
      type: 'text',
      required: true,
      label: 'Your Name',
    },
    {
      name: 'proposerEmail',
      type: 'email',
      required: true,
      label: 'Your Email',
    },
    {
      name: 'proposerRelation',
      type: 'select',
      label: 'You are proposing…',
      options: [
        { label: 'Myself as a guest', value: 'self' },
        { label: 'Someone else (nominating a scholar)', value: 'other' },
      ],
      defaultValue: 'self',
    },

    // Guest details
    {
      name: 'guestName',
      type: 'text',
      label: 'Guest Name',
      admin: {
        description: 'If nominating someone else, their full name.',
        condition: (_, siblingData) => siblingData?.proposerRelation === 'other',
      },
    },
    {
      name: 'guestEmail',
      type: 'email',
      label: 'Guest Email',
      admin: {
        condition: (_, siblingData) => siblingData?.proposerRelation === 'other',
      },
    },
    {
      name: 'guestRole',
      type: 'select',
      label: 'Guest Position',
      options: [
        { label: 'PhD Candidate', value: 'phd-candidate' },
        { label: 'Postdoctoral Researcher', value: 'postdoc' },
        { label: 'Lecturer / Assistant Professor', value: 'lecturer' },
        { label: 'Associate Professor', value: 'associate-professor' },
        { label: 'Professor', value: 'professor' },
        { label: 'Independent Researcher', value: 'independent' },
        { label: 'Research Fellow', value: 'fellow' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'guestInstitution',
      type: 'text',
      label: 'Guest Institution / Affiliation',
    },

    // Proposal details
    {
      name: 'discipline',
      type: 'text',
      required: true,
      label: 'Discipline / Field',
    },
    {
      name: 'topicTitle',
      type: 'text',
      required: true,
      label: 'Proposed Conversation Title',
      admin: {
        description: 'A provisional title for the conversation.',
      },
    },
    {
      name: 'topicSummary',
      type: 'textarea',
      required: true,
      label: 'Research Abstract',
      admin: {
        description:
          'Brief description of the research (150–300 words). What is the argument? What is the evidence? What are the stakes?',
      },
    },
    {
      name: 'publicRelevance',
      type: 'textarea',
      required: true,
      label: 'Why does this matter publicly?',
      admin: {
        description:
          'Why should a globally curious, non-specialist audience care about this? What policy, social, or ethical questions does it speak to?',
      },
    },
    {
      name: 'links',
      type: 'textarea',
      label: 'Links to published work / Google Scholar / ORCID',
      admin: {
        description: 'Paste links one per line.',
      },
    },
    {
      name: 'availability',
      type: 'textarea',
      label: 'Availability',
      admin: {
        description: 'General availability for a recorded conversation (timezone, weeks ahead, etc.)',
      },
    },

    // Honeypot (spam prevention)
    {
      name: 'honeypot',
      type: 'text',
      admin: {
        hidden: true,
        description: 'Spam trap — must be empty on submission.',
      },
    },

    // Internal workflow
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Under Review', value: 'reviewing' },
        { label: 'Shortlisted', value: 'shortlisted' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Declined', value: 'declined' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'internalNotes',
      type: 'richText',
      admin: {
        description: 'Internal notes — not visible to the proposer.',
      },
    },
    {
      name: 'linkedConversation',
      type: 'relationship',
      relationTo: 'conversations',
      admin: {
        description: 'Link to the conversation once it is recorded and published.',
      },
    },
  ],
  timestamps: true,
}

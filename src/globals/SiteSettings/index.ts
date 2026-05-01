import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Site',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Solomon Atah Pty Ltd',
    },
    {
      name: 'slogan',
      type: 'text',
      defaultValue: 'Know Tomorrow Today.',
    },
    {
      name: 'missionStatement',
      type: 'textarea',
      defaultValue:
        'Solomon Atah Pty Ltd is a sovereign intellectual holding company committed to building durable knowledge infrastructures across media, research, publishing, and cultural production. We develop ideas that endure, translate complex scholarship into public intelligence, and construct narrative systems that shape institutions rather than merely respond to them.',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      defaultValue:
        'A sovereign intellectual holding company operating at the intersection of thought and execution — media, research, publishing, academic services, and film.',
    },
    {
      name: 'siteUrl',
      type: 'text',
      defaultValue: 'https://solomonatah.com',
    },
    {
      name: 'youtubeChannelId',
      type: 'text',
      admin: { description: 'YouTube channel ID (UC...)' },
    },
    {
      name: 'youtubeChannelUrl',
      type: 'text',
    },
    {
      name: 'spotifyUrl',
      type: 'text',
    },
    {
      name: 'applePodcastsUrl',
      type: 'text',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Default social sharing image.' },
    },
    {
      name: 'disclaimer',
      type: 'textarea',
      defaultValue:
        'The views expressed by guests are their own and do not represent the position of Solomon Atah Pty Ltd, The Solomon Atah Podcast, or its host.',
    },
    {
      name: 'footerOriginNote',
      type: 'text',
      defaultValue: 'Rooted in South Africa. In conversation with the world.',
    },
  ],
}

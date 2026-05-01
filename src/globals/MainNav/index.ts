import type { GlobalConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const MainNav: GlobalConfig = {
  slug: 'main-nav',
  admin: {
    group: 'Site',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async () => {
        revalidatePath('/', 'layout')
      },
    ],
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'isExternal', type: 'checkbox', defaultValue: false },
      ],
      defaultValue: [
        { label: 'Media', href: '/media' },
        { label: 'Research & Publishing', href: '/research' },
        { label: 'Academic Services', href: '/academic-services' },
        { label: 'Film Projects', href: '/film' },
        { label: 'Merchandise & Books', href: '/merchandise' },
        { label: 'Support', href: '/support' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ],
}

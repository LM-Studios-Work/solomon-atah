import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { resendAdapter } from '@payloadcms/email-resend'

// Collections
import { Pages } from './src/collections/Pages'
import { Conversations } from './src/collections/Conversations'
import { Scholars } from './src/collections/Scholars'
import { Disciplines } from './src/collections/Disciplines'
import { Institutions } from './src/collections/Institutions'
import { Proposals } from './src/collections/Proposals'
import { PartnerInquiries } from './src/collections/PartnerInquiries'
import { Dispatches } from './src/collections/Dispatches'
import { Media } from './src/collections/Media'
import { Users } from './src/collections/Users'

// Globals
import { SiteSettings } from './src/globals/SiteSettings'
import { MainNav } from './src/globals/MainNav'
import { Footer } from './src/globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Solomon Atah Podcast CMS',
    },
  },

  collections: [
    Pages,
    Conversations,
    Scholars,
    Disciplines,
    Institutions,
    Proposals,
    PartnerInquiries,
    Dispatches,
    Media,
    Users,
  ],

  globals: [SiteSettings, MainNav, Footer],

  editor: lexicalEditor({}),

  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./sqlite.db',
    },
    push: process.env.NODE_ENV !== 'production',
  }),

  email:
    process.env.RESEND_API_KEY
      ? resendAdapter({
          defaultFromAddress: process.env.RESEND_FROM_ADDRESS || 'noreply@solomonatah.com',
          defaultFromName: 'The Solomon Atah Podcast',
          apiKey: process.env.RESEND_API_KEY,
        })
      : undefined,

  secret: process.env.PAYLOAD_SECRET || 'dev-secret-replace-in-production',

  typescript: {
    outputFile: path.resolve(dirname, 'src/types/payload-types.ts'),
  },

  plugins: [
    seoPlugin({
      collections: ['conversations', 'scholars', 'dispatches', 'pages'],
      generateTitle: ({ doc }) => {
        const title = (doc as { title?: string })?.title
        return title ? `${title} | Solomon Atah Podcast` : 'Solomon Atah Podcast'
      },
      generateDescription: ({ doc }) => {
        const desc = (doc as { excerpt?: string; description?: string })
        return desc?.excerpt || desc?.description || ''
      },
      generateURL: ({ doc, collectionSlug }) => {
        const slug = (doc as { slug?: string })?.slug || ''
        const base = process.env.NEXT_PUBLIC_SERVER_URL || 'https://solomonatah.com'
        const pathMap: Record<string, string> = {
          conversations: `/conversations/${slug}`,
          scholars: `/scholars/${slug}`,
          dispatches: `/dispatches/${slug}`,
          pages: `/${slug}`,
        }
        return `${base}${pathMap[collectionSlug as string] || ''}`
      },
    }),
  ],

  sharp,

  upload: {
    limits: {
      fileSize: 10_000_000, // 10MB
    },
  },
})

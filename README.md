# The Solomon Atah Podcast, Website

> *Know Tomorrow Today.*

A public-facing academic media institution. This repository contains the full website and content management system.

**Tech stack:** Next.js 15 (App Router) · Payload CMS 3.x · Tailwind CSS · SQLite (local) / PostgreSQL (production) · Vercel

---

## Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Environment Variables](#environment-variables)
3. [YouTube API Setup](#youtube-api-setup)
4. [Deploying to Vercel](#deploying-to-vercel)
5. [Switching to PostgreSQL for Production](#switching-to-postgresql-for-production)
6. [Content Management Guide (for Solomon)](#content-management-guide-for-solomon)
7. [Project Structure](#project-structure)

---

## Local Development Setup

### Prerequisites

- Node.js 18+ (project uses Node 22)
- npm 10+

### Step 1: Clone and install

```bash
git clone <your-repo-url>
cd solomon-atah
npm install
```

### Step 2: Configure environment

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in at minimum:

```env
PAYLOAD_SECRET=any-random-string-at-least-32-characters
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
DATABASE_URI=file:./sqlite.db
```

The site will work without YouTube API or Resend keys, those features will gracefully degrade.

### Step 3: Run the development server

```bash
npm run dev
```

The site is at `http://localhost:3000`
The Payload admin panel is at `http://localhost:3000/admin`

### Step 4: Create your first admin user

Visit `http://localhost:3000/admin` and follow the prompts to create an admin account.

### Step 5: (Optional) Seed sample data

To populate the database with sample disciplines, scholars, and conversations for development:

```bash
npx tsx src/seed/index.ts
```

This creates:
- 10 academic disciplines
- 5 institutions
- 3 sample scholars
- 3 sample conversations (in draft status)
- One admin user (email: `solomon@solomonatah.com`, password: `changeme123!`)

**Change the seeded password immediately.**

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PAYLOAD_SECRET` | Yes | Secret key for Payload auth. Generate with `openssl rand -hex 32`. |
| `DATABASE_URI` | Yes | `file:./sqlite.db` for local. PostgreSQL URL for production. |
| `NEXT_PUBLIC_SERVER_URL` | Yes | Full URL of the deployment, e.g. `https://solomonatah.com` |
| `YOUTUBE_API_KEY` | No* | YouTube Data API v3 key. Required for video sync. |
| `YOUTUBE_CHANNEL_ID` | No* | Your YouTube channel ID (starts with `UC`). |
| `RESEND_API_KEY` | No | Resend API key for transactional email. |
| `RESEND_FROM_ADDRESS` | No | Sender email address, e.g. `noreply@solomonatah.com` |
| `RESEND_TEAM_EMAIL` | No | Internal address for new proposal notifications. |
| `CRON_SECRET` | No* | Secret to protect the `/api/cron/sync-youtube` endpoint. Required in production. |

\* *Strongly recommended in production*

---

## YouTube API Setup

The site syncs with your YouTube channel to import conversation metadata automatically.

### Step 1: Create a Google Cloud project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (e.g. "Solomon Atah Podcast")
3. Enable the **YouTube Data API v3** (search in the API Library)

### Step 2: Create an API key

1. Go to **APIs & Services → Credentials**
2. Click **Create Credentials → API Key**
3. (Optional but recommended) Restrict the key to the YouTube Data API v3 and to your domain

### Step 3: Find your channel ID

1. Go to your YouTube channel
2. Click **More options (…) → About**
3. Under "Share channel", click **Copy channel ID**
4. It will look like `UCxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 4: Add to environment

```env
YOUTUBE_API_KEY=AIzaSy...
YOUTUBE_CHANNEL_ID=UC...
```

### How sync works

- **Manual sync:** `GET /api/cron/sync-youtube?secret=<CRON_SECRET>`, fetches all channel videos and creates draft conversations for any that don't exist yet.
- **Automatic sync:** Vercel runs the cron every 6 hours (configured in `vercel.json`).
- **After sync:** New conversations appear in the Payload admin as **drafts**. You must enrich them (add scholars, editorial summary, disciplines) and then **publish** them.

---

## Deploying to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. Vercel will auto-detect Next.js

### Step 3: Add environment variables

In Vercel's dashboard, add all required environment variables from your `.env.local`.

Change `DATABASE_URI` to your production PostgreSQL URL (see next section).

### Step 4: Deploy

Click **Deploy**. Vercel will build and deploy automatically.

Subsequent pushes to `main` will trigger automatic redeployment.

---

## Switching to PostgreSQL for Production

SQLite is fine for local development but not suitable for production (multiple serverless instances can't write to the same file).

### Option A: Neon (recommended, free tier available)

1. Create an account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string (e.g. `postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require`)

### Option B: Vercel Postgres / Supabase

Both are valid alternatives with similar setup processes.

### Step 1: Install the PostgreSQL adapter

```bash
npm install @payloadcms/db-postgres
```

### Step 2: Update `payload.config.ts`

Replace:

```ts
import { sqliteAdapter } from '@payloadcms/db-sqlite'
// ...
db: sqliteAdapter({ client: { url: process.env.DATABASE_URI } })
```

With:

```ts
import { postgresAdapter } from '@payloadcms/db-postgres'
// ...
db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } })
```

### Step 3: Update `DATABASE_URI`

Set your production environment variable:

```env
DATABASE_URI=postgresql://user:pass@host:5432/dbname?sslmode=require
```

---

## Content Management Guide (for Solomon)

### Accessing the admin panel

Go to `https://solomonatah.com/admin` and log in with your credentials.

---

### Managing Conversations

Conversations are the core content type. Each one corresponds to a recorded episode.

#### Adding a new conversation (after recording)

1. In the admin, go to **Conversations → Create New**
2. Fill in:
   - **Title**, the editorial title (can differ from YouTube title)
   - **Slug**, URL path, e.g. `dr-jane-smith-on-structural-adjustment` (auto-generated from title)
   - **YouTube ID**, the part after `?v=` in the YouTube URL
   - **Scholars**, link to the scholar(s) (create their profile first if needed)
   - **Disciplines**, tag with relevant disciplines
   - **Excerpt**, 1–2 sentences for cards and meta descriptions
   - **Editorial Summary**, 200–400 word abstract (written like a journal abstract)
   - **Timestamps**, key chapter markers
   - **Further Reading**, guest papers, related books
3. Set **Status** to `Published` when ready

#### Publishing vs Draft

- **Draft** = visible only in the admin. Not on the public site.
- **Published** = live on the site immediately.

Conversations imported via YouTube sync start as **drafts** and must be enriched and published manually.

---

### Managing Scholars

Each guest on the podcast should have a scholar profile.

1. Go to **Scholars → Create New**
2. Fill in their name, title, institution, research focus, and external links
3. Upload a professional photo (portrait orientation works best)
4. Link them to relevant disciplines
5. When creating a conversation, select this scholar in the **Scholars** field

---

### Managing Disciplines

Disciplines are the taxonomy for the archive. The initial set is seeded, but you can add more.

1. Go to **Disciplines → Create New**
2. Add a name, slug, description, and icon (emoji)
3. The **Order** field controls the display order on the disciplines index page

---

### Managing Proposals

When someone submits a proposal via `/propose`:

1. It appears in **Proposals** with status **New**
2. Review the proposal
3. Update the status:
   - **New** → received but not yet reviewed
   - **Under Review** → actively considering
   - **Shortlisted** → strong candidate, follow up
   - **Scheduled** → recording confirmed
   - **Declined** → not a fit (send a kind reply)
   - **Archived** → long-term parking

Add **Internal Notes** at any stage, these are not visible to the proposer.

---

### Managing Partner Inquiries

Partner inquiries from `/partner` appear in **Partner Inquiries** with status **New**.

---

### Managing Dispatches

Dispatches are the optional editorial blog (essays, reading lists, reflections).

1. Go to **Dispatches → Create New**
2. Write your content in the rich text editor
3. Set an **Issue** number (keeps the series numbered)
4. Set **Status** to `Published` when ready

**Only publish dispatches if you are committed to writing them regularly.** An empty dispatches section undermines institutional credibility more than it helps.

---

### Updating Site Settings

Go to **Globals → Site Settings** to update:
- Mission statement
- Social media links
- YouTube channel URL
- Spotify/Apple Podcasts URLs

---

### Global Navigation

Go to **Globals → Main Nav** to update the navigation links.

---

## Project Structure

```
solomon-atah/
├── payload.config.ts          # Payload CMS configuration (root level)
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind theme (brand colors, fonts)
├── vercel.json                # Vercel cron jobs and headers
├── .env.example               # Environment variable template
│
└── src/
    ├── app/
    │   ├── (frontend)/        # Public website
    │   │   ├── layout.tsx     # Root layout (fonts, header, footer, theme)
    │   │   ├── globals.css    # CSS custom properties and Tailwind
    │   │   ├── page.tsx       # Home page
    │   │   ├── about/
    │   │   ├── conversations/ # Archive + individual episode pages
    │   │   ├── scholars/      # Directory + individual scholar pages
    │   │   ├── disciplines/   # Index + per-discipline pages
    │   │   ├── dispatches/    # Editorial blog
    │   │   ├── propose/       # Guest proposal form
    │   │   ├── partner/       # Partnership inquiry form
    │   │   └── contact/
    │   │
    │   ├── (payload)/         # Payload admin (auto-generated)
    │   │   ├── admin/
    │   │   └── api/
    │   │
    │   ├── api/
    │   │   ├── propose/       # Form submission handler
    │   │   ├── partner/       # Form submission handler
    │   │   ├── og/            # Dynamic OG image generation
    │   │   └── cron/          # YouTube sync cron job
    │   │
    │   ├── feed.xml/          # RSS feed
    │   ├── sitemap.ts         # Dynamic sitemap
    │   └── robots.ts          # robots.txt
    │
    ├── collections/           # Payload CMS collection definitions
    │   ├── Conversations/
    │   ├── Scholars/
    │   ├── Disciplines/
    │   ├── Institutions/
    │   ├── Proposals/
    │   ├── PartnerInquiries/
    │   ├── Dispatches/
    │   ├── Pages/
    │   ├── Media/
    │   └── Users/
    │
    ├── globals/               # Payload CMS global definitions
    │   ├── SiteSettings/
    │   ├── MainNav/
    │   └── Footer/
    │
    ├── components/
    │   ├── layout/            # Header, Footer, Providers
    │   ├── ui/                # Atomic UI components
    │   └── sections/          # Page section components
    │       ├── ConversationCard/
    │       ├── ScholarCard/
    │       ├── YouTubePlayer/
    │       ├── CitationBlock/ # APA/MLA/Chicago citation generator
    │       ├── ProposalForm/
    │       └── PartnerForm/
    │
    ├── lib/
    │   ├── payload/           # Payload helper functions
    │   ├── youtube/           # YouTube Data API v3 client
    │   ├── email/             # Resend email client
    │   ├── seo/               # Metadata helpers
    │   ├── fonts.ts           # Fraunces + Inter (next/font)
    │   └── utils.ts           # cn(), formatDate(), citation builders
    │
    ├── seed/
    │   └── index.ts           # Development seed data
    │
    └── types/
        └── payload-types.ts   # Auto-generated Payload types
```

---

## Design System

**Colors:**
- Deep purple: `#4A1942`, primary brand, headers, CTAs
- Gold: `#C9A84C`, accent, section labels, pull quotes

**Fonts:**
- Headlines: Fraunces (variable serif, loaded via `next/font/google`)
- Body: Inter (grotesque, loaded via `next/font/google`)

**Tailwind utilities:**
- `.pull-quote`, editorial blockquote style
- `.discipline-tag`, small uppercase tag for disciplines
- `.prose-editorial`, long-form reading styles

---

## Citation System

Every published conversation includes a "How to cite this conversation" block at the bottom of the page, with one-click copy in APA, MLA, and Chicago formats. This is a genuine differentiator, it allows academics to reference podcast conversations in their published work.

The citation is auto-generated from the conversation's metadata (guest name, title, publication date, URL).

---

*Built for The Solomon Atah Podcast · Rooted in South Africa · In conversation with the world.*

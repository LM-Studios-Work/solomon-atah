import conversationsRaw from '@/data/conversations.json'
import scholarsRaw from '@/data/scholars.json'
import disciplinesRaw from '@/data/disciplines.json'
import dispatchesRaw from '@/data/dispatches.json'
import institutionsRaw from '@/data/institutions.json'
import achievementsRaw from '@/data/achievements.json'

// ─── Raw shapes (match the JSON file structure) ────────────────────────────────

interface RawConversation {
  id: string
  title: string
  slug: string
  status: 'published' | 'draft'
  publishedAt?: string | null
  youtubeId: string
  duration?: number | null
  youtubeThumbnailUrl?: string | null
  excerpt?: string | null
  editorialSummary?: string | null
  featured?: boolean
  scholars: string[]
  disciplines: string[]
  region?: string | null
  timestamps?: Array<{ time: string; label: string }>
  furtherReading?: Array<{
    type: string
    title: string
    author?: string | null
    year?: number | null
    url?: string | null
  }>
}

interface RawScholar {
  id: string
  name: string
  slug: string
  title?: string | null
  photo?: { url: string; alt: string } | null
  bio?: string | null
  researchFocus?: string | null
  institution?: string | null
  disciplines: string[]
  country?: string | null
  region?: string | null
  links?: {
    googleScholar?: string | null
    orcid?: string | null
    website?: string | null
    twitter?: string | null
    linkedin?: string | null
    researchgate?: string | null
  } | null
  selectedPublications?: Array<{ citation: string; url?: string | null; year?: number | null }>
}

interface RawDiscipline {
  id: string
  name: string
  slug: string
  description?: string | null
  icon?: string | null
  color?: string | null
  order: number
}

interface RawDispatch {
  id: string
  title: string
  slug: string
  issue?: number | null
  type: 'essay' | 'reading-list' | 'reflection' | 'field-notes' | 'interview'
  status: 'draft' | 'published'
  publishedAt?: string | null
  excerpt?: string | null
  coverImage?: { url: string; alt: string } | null
  content?: string | null
  relatedConversations?: string[]
}

interface RawInstitution {
  id: string
  name: string
  slug: string
  shortName?: string | null
  country: string
  region?: string | null
  type?: string | null
  website?: string | null
}

// ─── Resolved (exported) types ─────────────────────────────────────────────────

export type Institution = RawInstitution

export type Discipline = RawDiscipline

export interface Scholar extends Omit<RawScholar, 'institution' | 'disciplines'> {
  institution: Institution | null
  disciplines: Discipline[]
}

export interface Conversation extends Omit<RawConversation, 'scholars' | 'disciplines'> {
  scholars: Scholar[]
  disciplines: Discipline[]
}

export interface Dispatch extends Omit<RawDispatch, 'relatedConversations'> {
  relatedConversations: Array<{ slug: string; title: string }>
}

// ─── Internal data + indexes ───────────────────────────────────────────────────

const conversations = conversationsRaw as RawConversation[]
const scholars = scholarsRaw as RawScholar[]
const disciplines = disciplinesRaw as RawDiscipline[]
const dispatches = dispatchesRaw as RawDispatch[]
const institutions = institutionsRaw as RawInstitution[]

const scholarBySlug = new Map(scholars.map((s) => [s.slug, s]))
const disciplineBySlug = new Map(disciplines.map((d) => [d.slug, d]))
const institutionBySlug = new Map(institutions.map((i) => [i.slug, i]))
const conversationBySlug = new Map(conversations.map((c) => [c.slug, c]))
const dispatchBySlug = new Map(dispatches.map((d) => [d.slug, d]))

// ─── Resolvers ──────────────────────────────────────────────────────────────────

function resolveScholar(s: RawScholar): Scholar {
  return {
    ...s,
    institution: s.institution ? (institutionBySlug.get(s.institution) ?? null) : null,
    disciplines: s.disciplines
      .map((slug) => disciplineBySlug.get(slug))
      .filter((d): d is RawDiscipline => d !== undefined),
  }
}

function resolveConversation(c: RawConversation): Conversation {
  return {
    ...c,
    scholars: c.scholars
      .map((slug) => scholarBySlug.get(slug))
      .filter((s): s is RawScholar => s !== undefined)
      .map(resolveScholar),
    disciplines: c.disciplines
      .map((slug) => disciplineBySlug.get(slug))
      .filter((d): d is RawDiscipline => d !== undefined),
  }
}

function resolveDispatch(d: RawDispatch): Dispatch {
  return {
    ...d,
    relatedConversations: (d.relatedConversations ?? [])
      .map((slug) => conversationBySlug.get(slug))
      .filter((c): c is RawConversation => c !== undefined)
      .map((c) => ({ slug: c.slug, title: c.title })),
  }
}

function sortByPublishedAt(docs: RawConversation[]): RawConversation[] {
  return [...docs].sort((a, b) => {
    if (!a.publishedAt) return 1
    if (!b.publishedAt) return -1
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
}

// ─── Conversations ──────────────────────────────────────────────────────────────

export function getPublishedConversations(): Conversation[] {
  return sortByPublishedAt(conversations.filter((c) => c.status === 'published')).map(
    resolveConversation,
  )
}

export function queryConversations({
  discipline,
  region,
  page = 1,
  limit = 12,
}: {
  discipline?: string
  region?: string
  page?: number
  limit?: number
}) {
  let docs = conversations.filter((c) => c.status === 'published')
  if (discipline) docs = docs.filter((c) => c.disciplines.includes(discipline))
  if (region) docs = docs.filter((c) => c.region === region)
  docs = sortByPublishedAt(docs)
  const totalDocs = docs.length
  const totalPages = Math.max(1, Math.ceil(totalDocs / limit))
  const offset = (page - 1) * limit
  return {
    docs: docs.slice(offset, offset + limit).map(resolveConversation),
    totalDocs,
    totalPages,
    page,
  }
}

export function getConversationBySlug(slug: string): Conversation | null {
  const c = conversationBySlug.get(slug)
  if (!c || c.status !== 'published') return null
  return resolveConversation(c)
}

export function getConversationsByScholar(scholarSlug: string): Conversation[] {
  return sortByPublishedAt(
    conversations.filter((c) => c.status === 'published' && c.scholars.includes(scholarSlug)),
  ).map(resolveConversation)
}

export function getConversationsByDiscipline(
  disciplineSlug: string,
  page = 1,
  limit = 12,
) {
  let docs = conversations.filter(
    (c) => c.status === 'published' && c.disciplines.includes(disciplineSlug),
  )
  docs = sortByPublishedAt(docs)
  const totalDocs = docs.length
  const totalPages = Math.max(1, Math.ceil(totalDocs / limit))
  const offset = (page - 1) * limit
  return {
    docs: docs.slice(offset, offset + limit).map(resolveConversation),
    totalDocs,
    totalPages,
    page,
  }
}

// ─── Disciplines ────────────────────────────────────────────────────────────────

export function getDisciplines(): Discipline[] {
  return [...disciplines].sort((a, b) => a.order - b.order)
}

export function getDisciplinesWithCounts(): Array<Discipline & { count: number }> {
  return getDisciplines().map((d) => ({
    ...d,
    count: conversations.filter(
      (c) => c.status === 'published' && c.disciplines.includes(d.slug),
    ).length,
  }))
}

export function getDisciplineBySlug(slug: string): Discipline | null {
  return disciplineBySlug.get(slug) ?? null
}

// ─── Scholars ───────────────────────────────────────────────────────────────────

export function queryScholars({
  discipline,
  region,
  page = 1,
  limit = 24,
}: {
  discipline?: string
  region?: string
  page?: number
  limit?: number
}) {
  let docs = [...scholars]
  if (discipline) docs = docs.filter((s) => s.disciplines.includes(discipline))
  if (region) docs = docs.filter((s) => s.region === region)
  docs.sort((a, b) => a.name.localeCompare(b.name))
  const totalDocs = docs.length
  const totalPages = Math.max(1, Math.ceil(totalDocs / limit))
  const offset = (page - 1) * limit
  return {
    docs: docs.slice(offset, offset + limit).map(resolveScholar),
    totalDocs,
    totalPages,
    page,
  }
}

export function getScholarBySlug(slug: string): Scholar | null {
  const s = scholarBySlug.get(slug)
  if (!s) return null
  return resolveScholar(s)
}

// ─── Dispatches ─────────────────────────────────────────────────────────────────

export function getPublishedDispatches(): Dispatch[] {
  return [...dispatches]
    .filter((d) => d.status === 'published')
    .sort((a, b) => {
      if (!a.publishedAt) return 1
      if (!b.publishedAt) return -1
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
    .map(resolveDispatch)
}

export function getDispatchBySlug(slug: string): Dispatch | null {
  const d = dispatchBySlug.get(slug)
  if (!d || d.status !== 'published') return null
  return resolveDispatch(d)
}

// ─── Achievements ───────────────────────────────────────────────────────────────

export interface Achievement {
  id: string
  title: string
  issuer?: string | null
  year: string
  category: 'award' | 'milestone' | 'recognition' | 'media'
  description?: string | null
}

const achievements = achievementsRaw as Achievement[]

export function getAchievements(): Achievement[] {
  return [...achievements].sort((a, b) => Number(b.year) - Number(a.year))
}
